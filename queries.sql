--queries

--youngest congressmen
SELECT f_name, l_name, birth_date FROM congressmen ORDER BY birth_date DESC LIMIT 1;

--oldest
SELECT f_name, l_name, birth_date FROM congressmen ORDER BY birth_date ASC LIMIT 1;


--list of congressmen under 40
SELECT f_name, l_name, birth_date FROM congressmen WHERE birth_date > '1974-04-14' 
ORDER BY birth_date ASC; 

--does not have children?
SELECT f_name, l_name FROM congressmen WHERE has_child = 'f' ORDER BY birth_date ASC;

--religion counter
SELECT religion, COUNT(religion) AS religion_count FROM congressmen GROUP BY religion
ORDER BY religion_count DESC;

--amount in each party 
SELECT party, COUNT(party) AS party_count FROM congressmen GROUP BY party;

--number in each session for house
SELECT session, COUNT(session) AS num_session FROM house_term GROUP BY session ORDER BY session DESC;

--number in each session for senate
SELECT session, COUNT(session) AS num_session FROM senate_term GROUP BY session ORDER BY session DESC;

--total funding from individuals
SELECT SUM(transaction_amt) FROM funding_contributions_by_individuals;

--candidate funding?
SELECT cand_name FROM funding_candidate WHERE cand_pty_affiliation = 'DEM';

--Search query
SELECT first_name, last_name, mem_id FROM politcal_party.congressmen WHERE l_name ILIKE $1 ORDER BY f_name;


--funding queries

--dem funding
SELECT SUM(transaction_amt) AS amount FROM funding_contributions_to_candidates_by_committees 
INNER JOIN funding_candidate ON funding_contributions_to_candidates_by_committees.cand_id= funding_candidate.cand_id
WHERE cand_pty_affiliation = 'DEM';

--repub funding
SELECT SUM(transaction_amt) AS amount FROM funding_contributions_to_candidates_by_committees 
INNER JOIN funding_candidate ON funding_contributions_to_candidates_by_committees.cand_id= funding_candidate.cand_id
WHERE cand_pty_affiliation = 'REP';

--ind funding
SELECT SUM(transaction_amt) AS amount FROM funding_contributions_to_candidates_by_committees 
INNER JOIN funding_candidate ON funding_contributions_to_candidates_by_committees.cand_id= funding_candidate.cand_id
WHERE cand_pty_affiliation = 'IND';



--match up congressmen and funding_candidate
SELECT l_name FROM congressmen INNER JOIN funding_candidate ON congressmen.fec_id = funding_candidate.cand_id 
WHERE congressmen.fec_id = 'H6HI01121';

--winning amt? for all winners
SELECT SUM(transaction_amt) AS winning_amt FROM funding_contributions_to_candidates_by_committees
INNER JOIN congressmen ON funding_contributions_to_candidates_by_committees.cand_id = congressmen.fec_id;

--elected winning amount spent on campaign
--SELECT SUM(transaction_amt) AS winning_amt FROM 
--(funding_contributions_to_candidates_by_committees INNER JOIN funding_candidate 
--ON funding_contributions_to_candidates_by_committees.cand_id 

--Erics queries
--Query shows the number of congressmen in each committee (parent) from each state
WITH joined_congress AS(SELECT * FROM (SELECT gov_track_id AS gid, state_code, session FROM senate_term UNION SELECT gov_track_id AS gid, state_code, session FROM house_term) AS terms, congressmen WHERE terms.gid = congressmen.gov_track_id AND terms.session = 113)SELECT congressional_committees.committee_name, parent_committee_id, state_code, count(*)  FROM joined_congress, congressional_committees, congressmen_in_committee WHERE congressmen_in_committee.gov_track_id = joined_congress.gid AND congressmen_in_committee.session_number = 113 AND sub_committee_id = -1 AND congressional_committees.cong_cmte_id = parent_committee_id GROUP BY parent_committee_id, joined_congress.state_code, congressional_committees.committee_name ORDER BY parent_committee_id;


--Amount of money each state contributed to political campaigns during the last 4 years (from today)
SELECT totals.s1, totals.state FROM (SELECT sum(transaction_amt)::numeric::money AS s1, state FROM funding_contributions_to_candidates_by_committees WHERE state IS NOT NULL  AND transaction_tp != '20Y' AND transaction_tp != '22Y' AND transaction_tp != '24T' AND transaction_dt >= '04/30/2010'  GROUP BY state ORDER BY state) AS totals ORDER BY totals.s1 DESC;
