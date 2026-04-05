#!/bin/bash

savedir="$HOME/Pictures/Screenshots"
mkdir -p "$savedir"

cfg=$(mktemp /tmp/fuzzel-capture-XXXXXX.ini)
cat > "$cfg" << 'EOF'
[main]
font=Adwaita Sans:size=12
prompt=
anchor=bottom
y-margin=56
lines=6
width=28
horizontal-pad=20
vertical-pad=14
inner-pad=10
no-icons=true
exit-on-kb-custom1=

[colors]
background=141414ff
text=e8eaeaff
match=e8eaeaff
selection=1a73e8ff
selection-text=ffffffff
selection-match=ffffffff
prompt=606060ff
input=e8eaeaff
border=2a2a2aff

[border]
width=1
radius=22
EOF

choice=$(printf "  Screenshot Area\n  Screenshot Window\n  Screenshot Full\n  Record Area\n  Record Full\n  Stop Recording" | \
    fuzzel --dmenu \
           --config="$cfg" \
           --select-index=0 \
           --no-sort \
           --only-match \
           --cache=/dev/null)

rm -f "$cfg"

timestamp=$(date +%Y%m%d_%H%M%S)

case "$choice" in
    "  Screenshot Area")
        grimblast --notify copysave area "$savedir/$timestamp.png"
        ;;
    "  Screenshot Window")
        grimblast --notify copysave active "$savedir/$timestamp.png"
        ;;
    "  Screenshot Full")
        grimblast --notify copysave screen "$savedir/$timestamp.png"
        ;;
    "  Record Area")
        wf-recorder -g "$(slurp)" -f ~/Videos/record_$timestamp.mp4 &
        ;;
    "  Record Full")
        wf-recorder -f ~/Videos/record_$timestamp.mp4 &
        ;;
    "  Stop Recording")
        pkill -INT wf-recorder
        ;;
esac
