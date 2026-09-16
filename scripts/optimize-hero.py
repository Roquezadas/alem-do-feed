"""Resize/compress an approved hero asset without cropping or retouching."""
import argparse
from pathlib import Path
import re
from PIL import Image, ImageOps

parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument("source", type=Path)
parser.add_argument("--name", default="hero-pessoa-alem-do-frame")
args = parser.parse_args()
if not re.fullmatch(r"[a-z0-9]+(?:-[a-z0-9]+)*", args.name):
    parser.error("--name must be a lowercase, hyphen-separated asset name")
source = args.source.resolve()
destination = Path(__file__).resolve().parents[1] / "src" / "assets"
with Image.open(source) as original:
    image = ImageOps.exif_transpose(original).convert("RGB")
    for width in (640, 1120):
        height = round(image.height * width / image.width)
        result = image.resize((width, height), Image.Resampling.LANCZOS)
        output = destination / f"{args.name}-{width}.webp"
        result.save(output, "WEBP", quality=82, method=6)
        print(f"{output.name}: {width}x{height}, {output.stat().st_size} bytes")
