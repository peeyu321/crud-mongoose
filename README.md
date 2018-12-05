Prerequisite
============

### Initial setup

- docker run -p 5984:5984 -d couchdb
- curl -X PUT http://127.0.0.1:5984/rts
- wget https://gist.githubusercontent.com/peeyu321/0d5f5156b5ebad63556c18d4b3007dff/raw/fcc5a571ef577d3df48e74b86411a04bf703bbe7/design_doc.json
- curl -X PUT "http://127.0.0.1:5984/rts/_design/excel" --data-binary @design_doc.json
