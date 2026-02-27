#!/usr/bin/env bash

UUID1="$(uuidgen)"
UUID2="$(uuidgen)"

./start_deployment.sh $UUID1
sleep 0.5

./start_deployment.sh $UUID1
sleep 0.5

./finish_deployment.sh $UUID1
sleep 0.5

./finish_deployment.sh $UUID2
sleep 0.5

./fail_deployment.sh $UUID1
sleep 0.5

./fail_deployment.sh $UUID2
