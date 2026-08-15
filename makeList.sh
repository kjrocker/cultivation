#!/bin/bash
#
# Regenerate the SettingsEnum / LanguageEnum string unions from the XML tree.
# `du -a` walks in filesystem order, so the output is sorted before formatting —
# otherwise re-running this after any move reshuffles ~1000 lines for no reason.
# Run `yarn format` afterwards; the raw output is not prettier-shaped.

du -a ACS |
    grep '.xml$' |
    awk '{print $2}' |
    awk 'sub(".xml", "")' |
    awk 'sub("ACS/Settings/", "")' |
    grep -v '^Language/OfficialEnglish/Settings' |
    LC_ALL=C sort |
    awk '{printf("  | \"%s\"\n", $0);}' |
    awk 'BEGIN {print "export type SettingsEnum ="}; 1' |
    sed '$s/$/;/' >src/types/settings.ts

du -a ACS |
    grep '.xml$' |
    awk '{print $2}' |
    awk 'sub(".xml", "")' |
    awk 'sub("ACS/Settings/", "")' |
    grep '^Language/OfficialEnglish/Settings' |
    awk 'sub("Language/OfficialEnglish/Settings/", "")' |
    LC_ALL=C sort |
    awk '{printf("  | \"%s\"\n", $0);}' |
    awk 'BEGIN {print "export type LanguageEnum ="}; 1' |
    sed '$s/$/;/' >src/types/language.ts
