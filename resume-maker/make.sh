cd "$(dirname "$(readlink -f "$0")")"
pandoc resume.md -o resume-mid-temp.html
cat resume-before.html resume-mid-temp.html resume-after.html > ../resume.html
rm resume-mid-temp.html