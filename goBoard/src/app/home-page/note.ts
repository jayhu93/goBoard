export class Note {
    desc: string;
    bgcolor: string;
    x: number;
    y: number;
    constructor (desc: string, bgcolor: string, x: number, y: number) {
        this.desc = desc;
        this.bgcolor = bgcolor;
        this.x = x;
        this.y = y;
    }
    setPosition(x: number, y: number) {
      this.x = x;
      this.y = y;
    }
    getX() { return this.x; }
    getY() { return this.y; }
}
