#!/bin/sh
if [ ! -d "xml-js" ]; then
	mkdir xml-js
fi
packages=$(cd app; ls -d *);
for package in $packages
	do
		if [ ! -d "xml-js/$package" ]; then
			mkdir xml-js/$package
		fi
		echo "xml-js/$package";
		classes=$(cd app/$package; ls *.js);
		for class in $classes
			do
				if [ ! -f "xml-js/$package/$class.xml" ]; then
					touch xml-js/$package/$class.xml
				fi
				echo "xml-js/$package/$class.xml";
				node node_modules/jsdoc/jsdoc.js -p app/$package/$class app/app/app.js -d console -t templates/haruki -q format=xml > xml-js/$package/$class.xml
			done
	done
