SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;

SET search_path = public, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

CREATE SEQUENCE users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

CREATE TABLE meet_users(
    user_id integer DEFAULT nextval('users_id_seq') PRIMARY KEY NOT NULL,
    username varchar(32) NOT NULL,
    password_hash text NOT NULL,
    first_name varchar(64),
    last_name varchar(64),
    UNIQUE(username)
);

ALTER SEQUENCE users_id_seq OWNED BY meet_users.user_id;

CREATE SEQUENCE events_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

CREATE TABLE events_log(
    event_id integer DEFAULT nextval('events_id_seq') PRIMARY KEY NOT NULL,
    meetup_event_id varchar(32),
    event_name varchar(256) NOT NULL,
    event_date varchar(10) NOT NULL,
    event_start varchar(5) NOT NULL,
    event_duration integer,
    event_end varchar(5),
    event_venue varchar(128),
    event_lat NUMERIC NOT NULL,
    event_lng NUMERIC NOT NULL,
    event_rsvp integer,
    event_waitlist integer,
    event_link varchar(512),
    host_id integer,
    host_name varchar(256),
    UNIQUE(meetup_event_id)
);

ALTER SEQUENCE events_id_seq OWNED BY events_log.event_id;

CREATE SEQUENCE network_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

CREATE TABLE network(
    entry_id integer DEFAULT nextval('network_id_seq') PRIMARY KEY NOT NULL,
    user_id integer REFERENCES meet_users(user_id) NOT NULL,
    network_id integer REFERENCES meet_users(user_id) NOT NULL,
    network_status varchar(16) DEFAULT 'LISTED' NOT NULL,
    UNIQUE(user_id, network_id)
);

ALTER SEQUENCE network_id_seq OWNED BY network.entry_id;

CREATE SEQUENCE attending_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

CREATE TABLE attending_events(
    ae_id integer DEFAULT nextval('attending_id_seq') PRIMARY KEY NOT NULL,
    user_id integer REFERENCES meet_users(user_id) NOT NULL,
    event_id integer REFERENCES events_log(event_id) NOT NULL,
    expiration varchar(10) NOT NULL,
    ae_status varchar(32) DEFAULT 'ATTENDING' NOT NULL,
    UNIQUE(user_id, event_id)
);

ALTER SEQUENCE attending_id_seq OWNED BY attending_events.ae_id;
