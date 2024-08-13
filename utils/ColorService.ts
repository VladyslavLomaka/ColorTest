export class ColorService {
  private toHex(value: number) {
    var hex = value.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
  }

  public generateColor() {
    const getByteValue = () => Math.floor(Math.random() * 256);

    const color = {
      r: getByteValue(),
      g: getByteValue(),
      b: getByteValue(),
    };

    const hex = `#${[color.r, color.g, color.b]
      .map((c) => this.toHex(c))
      .join("")}`;

    return hex;
  }

  // calculating the luminance of color using ITU-R BT.709 standard
  // [https://www.itu.int/rec/R-REC-BT.709]
  public isColorDark(color: string) {
    const cleanHex = color.startsWith("#") ? color.substring(1) : color;

    const rgb = parseInt(cleanHex, 16);

    const r = (rgb >> 16) & 0xff;
    const g = (rgb >> 8) & 0xff;
    const b = (rgb >> 0) & 0xff;

    const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;

    return luminance < 140;
  }
}
