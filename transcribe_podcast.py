#!/usr/bin/env python3
"""
Transcribe podcast audio using faster-whisper.
Episode: "Của dân, do dân, vì dân" - Oddly Normal podcast ep.14
"""

import urllib.request
import os
import sys

AUDIO_URL = "https://cdn.simplecast.com/audio/c5c8e5eb-854c-44d8-b961-27ae763cc735/episodes/784e0fdf-5656-4740-8650-1f2af9a76fbe/audio/62acb1ed-7304-4ce9-ad00-5360c5b66b46/default_tc.mp3"
AUDIO_FILE = "democracy_podcast.mp3"
TRANSCRIPT_FILE = "transcript_cua_dan_do_dan_vi_dan.txt"
MODEL_SIZE = "small"  # small for speed, medium for better accuracy

def download_audio():
    if os.path.exists(AUDIO_FILE):
        print(f"Audio file already exists: {AUDIO_FILE}")
        return
    print(f"Downloading audio ({AUDIO_URL[:60]}...)...")
    print("File size ~73MB, this may take a moment...")

    def progress(count, block_size, total_size):
        percent = int(count * block_size * 100 / total_size)
        downloaded = count * block_size / (1024 * 1024)
        total = total_size / (1024 * 1024)
        sys.stdout.write(f"\r  {percent}% ({downloaded:.1f}/{total:.1f} MB)")
        sys.stdout.flush()

    urllib.request.urlretrieve(AUDIO_URL, AUDIO_FILE, progress)
    print(f"\nDownloaded: {AUDIO_FILE}")

def transcribe():
    from faster_whisper import WhisperModel

    print(f"\nLoading Whisper model: {MODEL_SIZE}")
    print("(First run will download model weights ~460MB for 'small')")
    model = WhisperModel(MODEL_SIZE, device="cpu", compute_type="int8")

    print(f"Transcribing {AUDIO_FILE}...")
    print("This will take 30-90 minutes on CPU. Please wait...\n")

    segments, info = model.transcribe(AUDIO_FILE, language="vi", beam_size=5)

    print(f"Detected language: {info.language} (probability: {info.language_probability:.2f})")
    print(f"Duration: {info.duration:.1f}s\n")

    with open(TRANSCRIPT_FILE, "w", encoding="utf-8") as f:
        f.write("TRANSCRIPT: Của dân, do dân, vì dân\n")
        f.write("Oddly Normal Podcast - Episode 14\n")
        f.write("=" * 60 + "\n\n")

        for segment in segments:
            timestamp = f"[{segment.start/60:.1f}m - {segment.end/60:.1f}m]"
            line = f"{timestamp} {segment.text.strip()}"
            print(line)
            f.write(line + "\n")

    print(f"\n✓ Transcript saved to: {TRANSCRIPT_FILE}")

if __name__ == "__main__":
    download_audio()
    transcribe()
