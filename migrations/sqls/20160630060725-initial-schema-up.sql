CREATE TABLE accesstoken(
  id character varying(1024) NOT NULL,
  ttl integer,
  created timestamp with time zone,
  userid integer,
  CONSTRAINT accesstoken_pkey PRIMARY KEY (id)
);

CREATE INDEX accesstoken__id__idx
  ON accesstoken
  USING btree
  (id COLLATE pg_catalog."default");

CREATE INDEX accesstoken__userid__idx
  ON accesstoken
  USING btree
  (userid);


CREATE TABLE accounts(
  id serial NOT NULL,
  email CITEXT NOT NULL,
  created timestamp with time zone,
  realm character varying(1024),
  username character varying(1024),
  password character varying(1024) NOT NULL,
  credentials character varying(1024),
  challenges character varying(1024),
  emailverified boolean,
  verificationtoken character varying(1024),
  status character varying(1024),
  lastupdated timestamp with time zone,
  CONSTRAINT account_pkey PRIMARY KEY (id)
);

CREATE INDEX accounts__id__idx
  ON accounts
  USING btree
  (id);

CREATE INDEX accounts__email__idx
  ON accounts
  USING btree
  (email COLLATE pg_catalog."default");

CREATE TABLE acl(
  model character varying(1024),
  property character varying(1024),
  accesstype character varying(1024),
  permission character varying(1024),
  principaltype character varying(1024),
  principalid character varying(1024),
  id serial NOT NULL,
  CONSTRAINT acl_pkey PRIMARY KEY (id)
);

CREATE TABLE role(
  id serial NOT NULL,
  name character varying(1024) NOT NULL,
  description character varying(1024),
  created timestamp with time zone,
  modified timestamp with time zone,
  CONSTRAINT role_pkey PRIMARY KEY (id)
);

CREATE TABLE rolemapping(
  id serial NOT NULL,
  principaltype character varying(1024),
  principalid character varying(1024),
  roleid integer,
  CONSTRAINT rolemapping_pkey PRIMARY KEY (id)
);
