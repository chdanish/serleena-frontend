#!/bin/sh
if [ ! -d "docsxml" ]; then
	mkdir docsxml
fi
packages=$(cd app; ls -d *);
for package in $packages
	do
		if [ ! -f "docsxml/$package.xml" ]; then
			touch docsxml/$package.xml
		fi
		node node_modules/jsdoc/jsdoc.js -p app/$package/*.js -d console -t templates/haruki -q format=xml > docsxml/$package.xml
	done
