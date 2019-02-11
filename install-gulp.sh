#!/bin/bash
clear

echo " ___           _        _ _ _                 _   _                      _                       "
echo "|_ _|_ __  ___| |_ __ _| | (_)_ __   __ _    | | | | ___  _ __ ___   ___| |__  _ __ _____      __"
echo " | || '_ \/ __| __/ _` | | | | '_ \ / _` |   | |_| |/ _ \| '_ ` _ \ / _ \ '_ \| '__/ _ \ \ /\ / /"
echo " | || | | \__ \ || (_| | | | | | | | (_| |   |  _  | (_) | | | | | |  __/ |_) | | |  __/\ V  V / "
echo "|___|_| |_|___/\__\__,_|_|_|_|_| |_|\__, |   |_| |_|\___/|_| |_| |_|\___|_.__/|_|  \___| \_/\_/  "
echo "                                    |___/                                                        "

/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"

echo "Installing Node"
brew install node
echo ""

echo "Installing Gulp (globally)"
npm install --global gulp
echo ""

echo "Installing Gulp-Watch (globally)"
npm install --global gulp-watch
echo ""

echo "Installing Gulp-Webserver (globally)"
npm install --global gulp-webserver
echo ""

echo "Installing Gulp (local)"
npm install gulp
echo ""

echo "Installing Gulp-Watch (local)"
npm install gulp-watch
echo ""

echo "Installing Gulp-Webserver (local)"
npm install gulp-webserver
echo ""

echo "DONE!"
echo ""
echo ""
echo ""
echo "Launching Gulp"
gulp
