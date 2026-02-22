#!/usr/bin/env python3
"""
Resume transcription từ phút 25.5 (giây 1530).
Append vào file transcript hiện có.
"""

import os
import sys

AUDIO_FILE = "democracy_podcast.mp3"
TRANSCRIPT_FILE = "transcript_cua_dan_do_dan_vi_dan.txt"
RESUME_FROM_SEC = 1530  # 25.5 phút × 60
MODEL_SIZE = "small"

def resume_transcribe():
    from faster_whisper import WhisperModel

    print(f"Loading Whisper model: {MODEL_SIZE}")
    model = WhisperModel(MODEL_SIZE, device="cpu", compute_type="int8")

    print(f"Resuming transcription from {RESUME_FROM_SEC}s ({RESUME_FROM_SEC/60:.1f}m)...")
    print("Appending to existing transcript file...\n")

    segments, info = model.transcribe(
        AUDIO_FILE,
        language="vi",
        beam_size=5,
        clip_timestamps=str(RESUME_FROM_SEC),
    )

    count = 0
    with open(TRANSCRIPT_FILE, "a", encoding="utf-8") as f:
        for segment in segments:
            timestamp = f"[{segment.start/60:.1f}m - {segment.end/60:.1f}m]"
            line = f"{timestamp} {segment.text.strip()}"
            print(line)
            f.write(line + "\n")
            count += 1

    print(f"\n✓ Resume complete. Added {count} segments.")
    print(f"✓ Transcript saved to: {TRANSCRIPT_FILE}")

if __name__ == "__main__":
    if not os.path.exists(AUDIO_FILE):
        print(f"ERROR: Audio file not found: {AUDIO_FILE}")
        sys.exit(1)

    resume_transcribe()
