#!/usr/bin/env

.PHONY: docs test

STATUS:="\x1b[96;01m\xE2\x80\xA2\x1b[0m"

# HELP

help:
	@echo ""
	@echo ${STATUS} HELP
	@echo ""
	@echo "demo             start demo"
	@echo "install          install dependencies"
	@echo ""

# APP

demo:
	@echo ${STATUS} STARING DEMO
	@http-server 

install:
	@echo ${STATUS} INSTALLING APP
	@npm install