#!/bin/bash

du -a static/ACS |
    grep '.xml$' |
    awk '{print $2}' |
    awk 'sub(".xml", "")' |
    awk 'sub("static/ACS/Settings/", "")' |
    grep -v '^Language/OfficialEnglish/Settings' |
    awk '{printf("  | \"%s\"\n", $0);}' |
    awk 'BEGIN {print "export type SettingsEnum ="}; 1' |
    sed '$s/$/;/' >src/types/settings.ts

du -a static/ACS |
    grep '.xml$' |
    awk '{print $2}' |
    awk 'sub(".xml", "")' |
    awk 'sub("static/ACS/Settings/", "")' |
    grep '^Language/OfficialEnglish/Settings' |
    awk 'sub("Language/OfficialEnglish/Settings/", "")' |
    awk '{printf("  | \"%s\"\n", $0);}' |
    awk 'BEGIN {print "export type LanguageEnum ="}; 1' |
    sed '$s/$/;/' >src/types/language.ts
