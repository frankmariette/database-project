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