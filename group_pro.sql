--Group project sql
DROP SCHEMA if EXISTS political_data CASCADE;
CREATE SCHEMA political_data;

SET search_path = political_data;

DROP TABLE if EXISTS congressmen; 
CREATE TABLE congressmen(
	mem_id serial PRIMARY KEY,
	f_name varchar(30) NOT NULL,
	l_name varchar(30) NOT NULL,
	birth_date date,
	gender varchar(1),
	party varchar(2) NOT NULL,
	alma_mater varchar(40),
	religion varchar(25),
	has_child boolean NOT NULL,
	married boolean NOT NULL,
	ethnicity varchar(30)
);

DROP INDEX if EXISTS cman_fname_lname_index;
CREATE INDEX cman_lname_fname_index ON congressmen(l_name, f_name);

DROP TABLE if EXISTS senate_term;
CREATE TABLE senate_term(
	mem_id int REFERENCES congressmen(mem_id),
	state_code varchar(2) NOT NULL,
	start_date date NOT NULL,
	end_date date,
	position varchar(50) NOT NULL,
	PRIMARY KEY(mem_id, start_date)
);

DROP TABLE if EXISTS house_term;
CREATE TABLE house_term(
	mem_id int REFERENCES congressmen(mem_id),
	state_code varchar(2) NOT NULL,
	district_number int NOT NULL,
	start_date date NOT NULL,
	end_date date,
	position varchar(50) NOT NULL,
	PRIMARY KEY(mem_id, start_date)
);

DROP TABLE if EXISTS congressional_committees;
CREATE TABLE congressional_committees(
	committee_name varchar(40) PRIMARY KEY,
	type varchar(15) NOT NULL,
	category varchar(30) NOT NULL,
	is_sub boolean NOT NULL,
	date_established date NOT NULL,
	end_date date
);

DROP TABLE if EXISTS congressmen_in_committee;
CREATE TABLE congressmen_in_committee(
	mem_id int,
	committee_name varchar(40),
	PRIMARY KEY(mem_id, committee_name )
);

DROP TABLE IF EXISTS funding_committee_designations;
CREATE TABLE funding_committee_designations(
	type varchar(1) PRIMARY KEY,
	description varchar(60)
);

INSERT INTO funding_committee_designations VALUES( 'A', 'Authorized by a canidate');
INSERT INTO funding_committee_designations VALUES( 'B', 'Lobbyist/Registrant PAC');
INSERT INTO funding_committee_designations VALUES( 'D', 'Leadership PAC');
INSERT INTO funding_committee_designations VALUES( 'J ', 'Joint Fundraiser');
INSERT INTO funding_committee_designations VALUES( 'P', 'Principal campagin committee of a candidate');
INSERT INTO funding_committee_designations VALUES( 'U', 'Unauthorized');

DROP TABLE IF EXISTS funding_committee_type_codes;
CREATE TABLE funding_committee_type_codes(
	cmte_type_code varchar(1) PRIMARY KEY,
	cmte_type_description varchar(55),
	cmte_modus_operandi varchar(800)
);

INSERT INTO funding_committee_type_codes VALUES('C', 'Communication Cost', 'Organizations like corporations or unions may prepare communications for their employees or members that advocate the election of specific candidates and they must disclose them under certain circumstances. These are usually paid with direct corporate or union funds rather than from PACs.');
INSERT INTO funding_committee_type_codes VALUES('D', 'Delegate Committee', 'Delegate committees are organized for the purpose of influencing the selection of delegates to Presidential nominating conventions. The term includes a group of delegates, a group of individuals seeking to become delegates, and a group of individuals supporting delegates.');
INSERT INTO funding_committee_type_codes VALUES('E', 'Electioneering Communication', 'Groups (other than PACs) making Electioneering Communications');
INSERT INTO funding_committee_type_codes VALUES('H', 'House', 'Campaign committees for candidates for the House of Representatives');
INSERT INTO funding_committee_type_codes VALUES('I', 'Independent Expenditor (Person or Group)', 'Individuals or groups (other than PACs) making independent expenditures over $250 in a year must disclose those expenditures');
INSERT INTO funding_committee_type_codes VALUES('N', 'PAC-Nonqualified', 'PACs that have not yet been in existence for six months and received contributions from 50 people and made contributions to five federal candidates. These committees have lower limits for their contributions to candidates.');
INSERT INTO funding_committee_type_codes VALUES('O', 'Independent Expenditure', 'Political Committee that has filed a statement consistent with AO 2010-09 or AO 2010-11. For more information about independent expenditures');
INSERT INTO funding_committee_type_codes VALUES('P', 'Presidential', 'Campaign committee for candidate for President');
INSERT INTO funding_committee_type_codes VALUES('Q', 'PAC - Qualified', 'PACs that have been in existence for six months and received contributions from 50 people and made contributions to five federal candidates');
INSERT INTO funding_committee_type_codes VALUES('S', 'Senate', 'Campaign committee for candidate for Senate');
INSERT INTO funding_committee_type_codes VALUES('U', 'Single Candidate Independent Expenditure', 'Political Committee For more information about independent expenditures');
INSERT INTO funding_committee_type_codes VALUES('V', 'PAC with Non-Contribution Account-Nonqualified', 'Political committees with non-contribution accounts');
INSERT INTO funding_committee_type_codes VALUES('W', 'PAC with Non-Contribution Account - Qualified', 'Political committees with non-contribution accounts');
INSERT INTO funding_committee_type_codes VALUES('X', 'Party - Nonqualified', 'Party committees that have not yet been in existence for six months and received contributions from 50 people, unless they are affiliated with another party committee that has met these requirements.' );
INSERT INTO funding_committee_type_codes VALUES('Y', 'Party - Qualified', 'Party committees that have existed for at least six months and received contributions from 50 people or are affiliated with another party committee that meets these requirements.' );
INSERT INTO funding_committee_type_codes VALUES('Z', 'National Party Nonfederal Account', 'National party nonfederal accounts. Not permitted after enactment of Bipartisan Campaign Reform Act of 2002.' );


DROP TABLE IF EXISTS funding_filing_freq_types;
CREATE TABLE funding_filing_freq_types(
	type varchar(1) PRIMARY KEY,
	description varchar(60)
);

INSERT INTO funding_filing_freq_types VALUES('A', 'Administratively terminated');
INSERT INTO funding_filing_freq_types VALUES('D', 'Debt');
INSERT INTO funding_filing_freq_types VALUES('M', 'Monthly filer');
INSERT INTO funding_filing_freq_types VALUES('Q', 'Quarterly filer');
INSERT INTO funding_filing_freq_types VALUES('T', 'Terminated');
INSERT INTO funding_filing_freq_types VALUES('W', 'Waived');


DROP TABLE IF EXISTS funding_org_tp_data;
CREATE TABLE funding_org_tp_data(
	type varchar(1) PRIMARY KEY,
	description varchar(60)
);

INSERT INTO funding_org_tp_data VALUES('C', 'Corporation');
INSERT INTO funding_org_tp_data VALUES('L', 'Labor organization');
INSERT INTO funding_org_tp_data VALUES('M', 'Membership orginization');
INSERT INTO funding_org_tp_data VALUES('T', 'Trade association');
INSERT INTO funding_org_tp_data VALUES('V', 'Cooperative');
INSERT INTO funding_org_tp_data VALUES('W', 'Corporation without capital stock');

--Note that the committee type meta table still needs to be populated
DROP TABLE IF EXISTS funding_committee;
CREATE TABLE funding_committee(
	cmte_id varchar(9),
	cmte_nm varchar(200),
	tres_nm varchar(90),
	cmte_st1 varchar(34),
	cmte_st2 varchar(34),
	cmte_city varchar(20),
	cmte_st varchar(2),
	cmte_zip varchar(9),
	cmte_dsgn varchar(1) REFERENCES funding_committee_designations(type),
	cmte_tp varchar(1) REFERENCES funding_committee_type_codes(cmte_type_code),
	cmte_pty_affiliation varchar(3),
	cmte_filing_freq varchar(1) REFERENCES funding_filing_freq_types(type),
	org_tp varchar(1) REFERENCES funding_org_tp_data(type),
	connected_org_nm varchar(200),
	cand_id varchar(9),
	PRIMARY KEY (cmte_id )
);

--The following tables store meta-data used to describe keys utilized by the funding_canidate relation
DROP TABLE IF EXISTS funding_cand_ici;
CREATE TABLE funding_cand_ici(
	type varchar(1) PRIMARY KEY,
	description varchar(200)
);

INSERT INTO funding_cand_ici VALUES('C', 'Challenger');
INSERT INTO funding_cand_ici VALUES('I', 'Incumbent');
INSERT INTO funding_cand_ici VALUES('O', 'Open Seat: One where the incumbent did not run for re-election');

DROP TABLE IF EXISTS funding_candidate_status;
CREATE TABLE funding_candidate_status(
	type varchar(1) PRIMARY KEY,
	description varchar(100)
);

INSERT INTO funding_candidate_status VALUES('C', 'Statutory candidate');
INSERT INTO funding_candidate_status VALUES('F', 'Statutory candidate for future election');
INSERT INTO funding_candidate_status VALUES('N', 'Not yet a statutory candidate');
INSERT INTO funding_candidate_status VALUES('P', 'Statutory candiate in prior cycle');


----------------Helpful Information about the funding_canidate relation ----------
--Congressional district number is defined as 00 for all congressmen 
--that fit one of the following descriptors: at_large, sentor, or presdential

DROP TABLE IF EXISTS funding_candidate;
CREATE TABLE funding_candidate(
	cand_id varchar(9),
	cand_name varchar(200),
	cand_pty_affiliation varchar(3),
	cand_election_yr int,
	cand_office_st varchar(2),     --This field will be US for presdential records
	cand_office varchar(1),        -- H = house, P = President, S = Senate
	cand_office_district varchar(2),
	cand_ici varchar(1) REFERENCES funding_cand_ici(type),
	cand_status varchar(1) REFERENCES funding_candidate_status(type),
	cand_pcc varchar(9),
	cand_st1 varchar(34),
	cand_st2 varchar(34),
	cand_city varchar(30),
	cand_st varchar(2),
	cand_zip varchar(9),
	PRIMARY KEY(cand_id)
);


--This is the join table for the funding_candidate and
--funding_committee tables. Note that the site
--has extraneous fields, so not all info from file is needed
DROP TABLE IF EXISTS funding_candidate_committee;
CREATE TABLE funding_candidate_committee(
	cand_id varchar(9) REFERENCES funding_candidate(cand_id),
	cand_election_yr integer,
	fec_election_yr integer,
	cmte_id varchar(9) REFERENCES funding_committee(cmte_id),
	cmte_tp varchar(1) REFERENCES funding_committee_type_codes(cmte_type_code),
	cmte_dsgn varchar(1) REFERENCES funding_committee_designations(type),
	linkage_id int, 
	PRIMARY KEY(cand_id, cmte_id)
);


DROP TABLE IF EXISTS funding_report_type_meta;
CREATE TABLE funding_report_type_meta(
	rpt_tp varchar(3) PRIMARY KEY,
	report_type_name_full varchar(40),
	report_type_parameters varchar(500)
);

INSERT INTO funding_report_type_meta VALUES('12C', 'PRE-CONVENTION', 'For states using conventions to select candidates. Report covers through 20 days before the convention');
INSERT INTO funding_report_type_meta VALUES('12G', 'PRE-GENERAL', 'Report covers through 20 days before the general election - due 12 days before the election');
INSERT INTO funding_report_type_meta VALUES('12P', 'PRE-PRIMARY', 'Report covers through 20 days before the primary- due 12 days before the election');
INSERT INTO funding_report_type_meta VALUES('12R', 'PRE-RUN-OFF', 'Report covers through 20 days before the run-off- due 12 days before the election');
INSERT INTO funding_report_type_meta VALUES('12S', 'PRE-SPECIAL', 'Report covers through 20 days before the special election - due 12 days before the election');
INSERT INTO funding_report_type_meta VALUES('30D', 'POST-ELECTION', 'Report covers from 19 days before the election through 20 days after - due 30 days after the ');
INSERT INTO funding_report_type_meta VALUES('30G', 'POST-GENERAL', 'Report covers from 19 days before the election through 20 days after. - due 30 days after the election');
INSERT INTO funding_report_type_meta VALUES('30P', 'POST-PRIMARY', 'Report covers from 19 days before the election through 20 days after. - due 30 days after the election');
INSERT INTO funding_report_type_meta VALUES('30R', 'POST-RUN-OFF', 'Report covers from 19 days before the election through 20 days after. - due 30 days after the election');
INSERT INTO funding_report_type_meta VALUES('30S', 'POST-SPECIAL', 'Report covers from 19 days before the election through 20 days after. - due 30 days after the election');
INSERT INTO funding_report_type_meta VALUES('60D', 'POST-CONVENTION', 'Report filed by national party convention and host committees disclosing their convention expenses, due 60 days after the convention');
INSERT INTO funding_report_type_meta VALUES('ADJ', 'COMP ADJUST AMEND', 'Adjustment of a comprehensive amendment - coverage is variable');
INSERT INTO funding_report_type_meta VALUES('CA', 'COMPREHENSIVE AMEND', 'Amendment modifying information from two or more original reports - coverage is variable');
INSERT INTO funding_report_type_meta VALUES('M10', 'OCTOBER MONTHLY', 'Covers September - due October 20');
INSERT INTO funding_report_type_meta VALUES('M11', 'NOVEMBER MONTHLY', 'Covers October - due November 20');
INSERT INTO funding_report_type_meta VALUES('M12', 'DECEMBER MONTHLY', 'Covers November - due December 20');
INSERT INTO funding_report_type_meta VALUES('M2', 'FEBRUARY MONTHLY', 'Covers January - due February 20');
INSERT INTO funding_report_type_meta VALUES('M3', 'MARCH MONTHLY', 'Covers February - due March 20');
INSERT INTO funding_report_type_meta VALUES('M4', 'ARPIL MONTHLY', 'Covers March - due April 20');
INSERT INTO funding_report_type_meta VALUES('M5', 'MARY MONTHLY', 'Covers April - due May 20');
INSERT INTO funding_report_type_meta VALUES('M6', 'JUNE MONTHLY', 'Covers May - due June 20');
INSERT INTO funding_report_type_meta VALUES('M7', 'JULY MONTHLY', 'Covers June - due July 20');
INSERT INTO funding_report_type_meta VALUES('M8', 'AUGUST MONTHLY', 'Covers July - due August 20');
INSERT INTO funding_report_type_meta VALUES('M9', 'SEPTEMBER MONTHLY', 'Covers August - due September 20');
INSERT INTO funding_report_type_meta VALUES('MY',  'MID-YEAR REPORT', 'Covers January 1 through June 30 - due July 31 Permissible in non-election years for PACs and party committees normally filing Quarterly reports. (Note that since 2003 campaign committees must file quarterly in all years.)');
INSERT INTO funding_report_type_meta VALUES('Q1', 'APRIL QUARTERLY', 'Covers January 1 through March 31 - due April 15');
INSERT INTO funding_report_type_meta VALUES('Q2', 'JULY QUARTERLY', 'Covers April 1 through June 30 - due July 15');
INSERT INTO funding_report_type_meta VALUES('Q3', 'OCTOBER QUARTERLY', 'Covers July 1 through September 30 - due October 15');
INSERT INTO funding_report_type_meta VALUES('TER', 'TERMINATION REPORT', 'Final report submitted by a committee - coverage is variable');
INSERT INTO funding_report_type_meta VALUES('YE', 'YEAR-END', 'Covers from the end of the last quarterly or mid-year report through December 31 - due January 31');
INSERT INTO funding_report_type_meta VALUES('90S', 'POST INAUGURAL SUPPLEMENT', NULL);
INSERT INTO funding_report_type_meta VALUES('90D', 'POST INAUGURAL', 'Filing of Presidential inaugural committee - due 90 days after the Inauguration');
INSERT INTO funding_report_type_meta VALUES('48H', '48 HOUR NOTIFICATION', 'Report of specific contribution of $1,000 or more made to a campaign within 20 days of an election. Alternatively, once a PAC or party or other person has made independent expenditures exceeding $10,000 in a race these and future independent expenditures must be reported. Due within 48 hours of receiving the contribution or public distribution of the independent expenditure. 48 hour timing for independent expenditures applies prior to 20 days before the election.');
INSERT INTO funding_report_type_meta VALUES('24H', '24 HOUR NOTIFICATION', 'Within 20 days of an election once a PAC or party or other person has made independent expenditures exceeding $1,000 in a race these and future independent expenditures must be reported. Due within 24 hours of the public distribution of the independent expenditure.');

DROP TABLE IF EXISTS funding_transaction_type;
CREATE TABLE funding_transaction_type(
	id varchar(3) PRIMARY KEY,
	description varchar(100)
);

INSERT INTO funding_transaction_type VALUES('10', 'Non-Federal Receipt from Persons');
INSERT INTO funding_transaction_type VALUES('10J', 'Memo Receipt from JF Super PAC');
INSERT INTO funding_transaction_type VALUES('11', 'Tribal contribution');
INSERT INTO funding_transaction_type VALUES('11J', 'Memo Receipt from JF Tribal');
INSERT INTO funding_transaction_type VALUES('12', 'Non-Federal Other Receipt - Levin Account (L-2)');
INSERT INTO funding_transaction_type VALUES('13', 'Inaugural Donation Accepted');
INSERT INTO funding_transaction_type VALUES('15', 'Contribution');
INSERT INTO funding_transaction_type VALUES('15C', 'Contribution from Candidate');
INSERT INTO funding_transaction_type VALUES('15E', 'Earmarked Contribution');
INSERT INTO funding_transaction_type VALUES('15F', 'Loans forgiven by Candidate');
INSERT INTO funding_transaction_type VALUES('15I', 'Earmarked Intermeadiary In');
INSERT INTO funding_transaction_type VALUES('15J', 'Memo (Filers Percentage of Contribution Given to Join Fundraising Committee)');
INSERT INTO funding_transaction_type VALUES('15T', 'Earmarked Intermediary Treasury In');
INSERT INTO funding_transaction_type VALUES('15Z', 'In-Kind Contribution Received from Registered Filer');
INSERT INTO funding_transaction_type VALUES('16C', 'Loans Received from the Candidate');
INSERT INTO funding_transaction_type VALUES('16F', 'Loans Received from Banks');
INSERT INTO funding_transaction_type VALUES('16G', 'Loan from Individual');
INSERT INTO funding_transaction_type VALUES('16H', 'Loan from Registered Filers');
INSERT INTO funding_transaction_type VALUES('16J', 'Loan Repayments from Individual');
INSERT INTO funding_transaction_type VALUES('16K', 'Loan Repayments from Registered Filer');
INSERT INTO funding_transaction_type VALUES('16L', 'Loan Repayments Received from Unregistered Entity');
INSERT INTO funding_transaction_type VALUES('16R', 'Loans Received from Registered Filers');
INSERT INTO funding_transaction_type VALUES('16U', 'Loan Received from Unregistered Entity');
INSERT INTO funding_transaction_type VALUES('17R', 'Contribution Refund Received from Registered Entity');
INSERT INTO funding_transaction_type VALUES('17U', 'Refunds/Rebates/Returns Received from Unregistered Entity');
INSERT INTO funding_transaction_type VALUES('17Y', 'Refunds/Rebates/Returns from Individual or Corporation');
INSERT INTO funding_transaction_type VALUES('17Z', 'Refunds/Rebates/Returns from Candidate or Committee');
INSERT INTO funding_transaction_type VALUES('18G', 'Transfer In Affiliated');
INSERT INTO funding_transaction_type VALUES('18H', 'Honorarium Received');
INSERT INTO funding_transaction_type VALUES('18J', 'Memo (Filers Percentage of Contribution Given to Join Fundraising Committee)');
INSERT INTO funding_transaction_type VALUES('18K', 'Contribution Received from Registered Filer');
INSERT INTO funding_transaction_type VALUES('18L', 'Bundled Contribution');
INSERT INTO funding_transaction_type VALUES('18S', 'Receipts from Secretary of State');
INSERT INTO funding_transaction_type VALUES('18U', 'Contribution Received from Unregistered Committee');
INSERT INTO funding_transaction_type VALUES('19', 'Electioneering Communication Donation Received');
INSERT INTO funding_transaction_type VALUES('19J', 'Memo (Electioneering Communication Percentage of Donation Given to Join Fundraising Committee)');
INSERT INTO funding_transaction_type VALUES('20', 'Disbursement - Exempt from Limits');
INSERT INTO funding_transaction_type VALUES('20A', 'Non-Federal Disbursement - Levin Account (L-4A) Voter Registration');
INSERT INTO funding_transaction_type VALUES('20B', 'Non-Federal Disbursement - Levin Account (L-4B) Voter Identification');
INSERT INTO funding_transaction_type VALUES('20C', 'Loan Repayments Made to Candidate');
INSERT INTO funding_transaction_type VALUES('20D', 'Non-Federal Disbursement - Levin Account (L-4D) Generic Campaign');
INSERT INTO funding_transaction_type VALUES('20F', 'Loan Repayments Made to Banks');
INSERT INTO funding_transaction_type VALUES('20G', 'Loan Repayments Made to Individual');
INSERT INTO funding_transaction_type VALUES('20R', 'Loan Repayments Made to Registered Filer');
INSERT INTO funding_transaction_type VALUES('20V', 'Non-Federal Disbursement - Levin Account (L-4C) Get Out The Vote');
INSERT INTO funding_transaction_type VALUES('20Y', 'Non-Federal Refund');
INSERT INTO funding_transaction_type VALUES('21Y', 'Tribal Refund');
INSERT INTO funding_transaction_type VALUES('22G', 'Loan to Individual');
INSERT INTO funding_transaction_type VALUES('22H', 'Loan to Candidate or Committee');
INSERT INTO funding_transaction_type VALUES('22J', 'Loan Repayment to Individual');
INSERT INTO funding_transaction_type VALUES('22K', 'Loan Repayment to Candidate or Committee');
INSERT INTO funding_transaction_type VALUES('22L', 'Loan Repayment to Bank');
INSERT INTO funding_transaction_type VALUES('22R', 'Contribution Refund to Unregistered Entity');
INSERT INTO funding_transaction_type VALUES('22U', 'Loan Repaid to Unregistered Entity');
INSERT INTO funding_transaction_type VALUES('22X', 'Loan Made to Unregistered Entity');
INSERT INTO funding_transaction_type VALUES('22Y', 'Contribution Refund to Individual');
INSERT INTO funding_transaction_type VALUES('22Z', 'Contribution Refund to Candidate or Committee');
INSERT INTO funding_transaction_type VALUES('23Y', 'Inaugural Donation Refund');
INSERT INTO funding_transaction_type VALUES('24A', 'Independent Expenditure Against');
INSERT INTO funding_transaction_type VALUES('24C', 'Coordinated Expenditure');
INSERT INTO funding_transaction_type VALUES('24E', 'Independent Expenditure For');
INSERT INTO funding_transaction_type VALUES('24F', 'Communication Cost for Candidate (C7)');
INSERT INTO funding_transaction_type VALUES('24G', 'Transfer Out Affiliated');
INSERT INTO funding_transaction_type VALUES('24H', 'Honorarium to Candidate');
INSERT INTO funding_transaction_type VALUES('24I', 'Earmarked Intermediary Ou');
INSERT INTO funding_transaction_type VALUES('24K', 'Contribution Made to Non-Affiliated');
INSERT INTO funding_transaction_type VALUES('24N', 'Communication Cost Against Candidate (C7)');
INSERT INTO funding_transaction_type VALUES('24P', 'Contribution Made to Possible Candidate');
INSERT INTO funding_transaction_type VALUES('24R', 'Election Recount Disbursement');
INSERT INTO funding_transaction_type VALUES('24T', 'Earmarked Intermediary Treasury Out');
INSERT INTO funding_transaction_type VALUES('24U', 'Contribution Made to Unregistered Entity');
INSERT INTO funding_transaction_type VALUES('24Z', 'In-Kind Contribution Made to Registered Filer');
INSERT INTO funding_transaction_type VALUES('28L', 'Refund of Bundled Contribution');
INSERT INTO funding_transaction_type VALUES('29', 'Electioneering Communication Disbursement or Obligation');


DROP TABLE IF EXISTS funding_entity_type_meta;
CREATE TABLE funding_entity_type_meta(
	entity_tp varchar(3) PRIMARY KEY,
	description varchar(120)
);

INSERT INTO funding_entity_type_meta VALUES('CAN', 'Candidate');
INSERT INTO funding_entity_type_meta VALUES('CCM', 'Candidate Committee');
INSERT INTO funding_entity_type_meta VALUES('COM', 'Committee');
INSERT INTO funding_entity_type_meta VALUES('IND', 'CIndividual');
INSERT INTO funding_entity_type_meta VALUES('ORG', 'Organization (not a committee and not a person)');
INSERT INTO funding_entity_type_meta VALUES('PAC', 'Political Action Committee');
INSERT INTO funding_entity_type_meta VALUES('PTY', 'Party Organization');


---------------------Helpful Info About following relation ---------------
DROP TABLE IF EXISTS funding_contributions_to_candidates_by_committees;
CREATE TABLE funding_contributions_to_candidates_by_committees(
	cmte_id varchar(9) REFERENCES funding_committee(cmte_id),
	amndt_ind varchar(1), --(N) = new (A) = amendment (T) = termination
	rpt_tp varchar(3) REFERENCES funding_report_type_meta(rpt_tp),
	transaction_prgi varchar(5), --E, P, G, or O followed by year
	image_num varchar(11),
	transaction_tp varchar(3) REFERENCES funding_transaction_type(id),
	entity_tp varchar(3) REFERENCES funding_entity_type_meta(entity_tp),
	name varchar(200),
	city varchar(30),
	state varchar(2),
	zip_code varchar(9),
	employer varchar(38),
	occupation varchar(38),
	transaction_dt date,
	transaction_amt double precision,
	other_id varchar(9),
	cand_id varchar(9) REFERENCES funding_candidate(cand_id),
	tran_id varchar(32),
	file_num double precision,
	memo_cd varchar(1),
	memo_text varchar(100),
	sub_id integer
);

DROP TABLE IF EXISTS funding_committie_to_committee;
CREATE TABLE funding_committie_to_committee(
	cmte_id varchar(9) REFERENCES funding_committee(cmte_id),
	amndt_ind varchar(1), -- (N)ew, (A)mendment, (T)ermination,
	rpt_tp varchar(3) REFERENCES funding_report_type_meta(rpt_tp),
	trasaction_pgi varchar(5),
	image_num varchar(11),
	transaction_tp varchar(3) REFERENCES funding_transaction_type(id),
	entity_tp varchar(3) REFERENCES funding_entity_type_meta(entity_tp),
	name varchar(200),
	city varchar(30),
	state varchar(2),
	zip_code varchar(9),
	employer varchar(38),
	occupation varchar(38),
	transaction_dt date,
	transaction_amt double precision,	
	other_id varchar(9),
	tran_id varchar(32),
	file_num double precision,
	memo_cd varchar(1),
	memo_text varchar(100),
	sub_id integer
);

DROP TABLE IF EXISTS funding_contributions_by_individuals;
CREATE TABLE funding_contributions_by_individuals(
	cmte_id varchar(9) REFERENCES funding_committee(cmte_id),
	amndt_ind varchar(1), -- (N)ew, (A)mendment, (T)ermination,
	rpt_tp varchar(3) REFERENCES funding_report_type_meta(rpt_tp),
	trasaction_pgi varchar(5),
	image_num varchar(11),
	transaction_tp varchar(3) REFERENCES funding_transaction_type(id),
	entity_tp varchar(3) REFERENCES funding_entity_type_meta(entity_tp),
	name varchar(200),
	city varchar(30),
	state varchar(2),
	zip_code varchar(9),
	employer varchar(38),
	occupation varchar(38),
	transaction_dt date,
	transaction_amt double precision,	
	other_id varchar(9),
	tran_id varchar(32),
	file_num double precision,
	memo_cd varchar(1),
	memo_text varchar(100),
	sub_id integer	
);