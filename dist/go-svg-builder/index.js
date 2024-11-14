"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoSVGBuilder = void 0;
class CoordinateSystem {
    static parseIntersection(intersection) {
        const pattern = /^([ABCDEFGHJKLMNOPQRST])(1?\d)$/;
        const matchResult = pattern.exec(intersection);
        if (!matchResult) {
            return [-1, -1];
        }
        const x = matchResult[1];
        const y = matchResult[2];
        return [this.HorizontalLabels.indexOf(x), this.VerticalLabels.indexOf(y)];
    }
    static getIntersection(x, y) {
        if (x < 19 && x >= 0 && y < 19 && y >= 0) {
            return `${this.HorizontalLabels[x]}${this.VerticalLabels[y]}`;
        }
        return "";
    }
    constructor(size, radio) {
        this.size = size;
        this.gridSize = size * radio;
        this.marginWidth = (this.size - this.gridSize) / 2;
        this.labelBaseline = this.marginWidth / 2;
        this.offset = this.marginWidth;
        this.stepLength = this.gridSize / 18;
    }
    getIntersectionCoordinate(intersection) {
        const [x, y] = CoordinateSystem.parseIntersection(intersection);
        return [x * this.stepLength + this.offset, y * this.stepLength + this.offset];
    }
    getIndexCoordinate(x, y) {
        if (x < 19 && x >= 0 && y < 19 && y >= 0) {
            return [x * this.stepLength + this.offset, y * this.stepLength + this.offset];
        }
        return [0, 0];
    }
    getLabelAndCoordinate(location, index) {
        switch (location) {
            case "top":
                return [CoordinateSystem.HorizontalLabels[index], index * this.stepLength + this.offset, this.labelBaseline];
            case "bottom":
                return [CoordinateSystem.HorizontalLabels[index], index * this.stepLength + this.offset, this.size - this.labelBaseline];
            case "left":
                return [CoordinateSystem.VerticalLabels[index], this.labelBaseline, index * this.stepLength + this.offset];
            case "right":
                return [CoordinateSystem.VerticalLabels[index], this.size - this.labelBaseline, index * this.stepLength + this.offset];
        }
    }
    getGridPath() {
        const path = [];
        for (let i = 0; i < 19; i++) {
            const horizontalBegin = this.getIndexCoordinate(0, i);
            const horizontalEnd = this.getIndexCoordinate(18, i);
            const verticalBegin = this.getIndexCoordinate(i, 0);
            const verticalEnd = this.getIndexCoordinate(i, 18);
            path.push(`M ${horizontalBegin[0]} ${horizontalBegin[1]} L ${horizontalEnd[0]} ${horizontalEnd[1]}`);
            path.push(`M ${verticalBegin[0]} ${verticalBegin[1]} L ${verticalEnd[0]} ${verticalEnd[1]}`);
        }
        return path.join(" ");
    }
    getStarCoordinates() {
        return [
            this.getIntersectionCoordinate("D16"),
            this.getIntersectionCoordinate("K16"),
            this.getIntersectionCoordinate("Q16"),
            this.getIntersectionCoordinate("D10"),
            this.getIntersectionCoordinate("K10"),
            this.getIntersectionCoordinate("Q10"),
            this.getIntersectionCoordinate("D4"),
            this.getIntersectionCoordinate("K4"),
            this.getIntersectionCoordinate("Q4"),
        ];
    }
}
CoordinateSystem.HorizontalLabels = [
    "A", "B", "C", "D", "E", "F", "G", "H", "J", "K",
    "L", "M", "N", "O", "P", "Q", "R", "S", "T"
];
CoordinateSystem.VerticalLabels = [
    "19", "18", "17", "16", "15", "14", "13", "12", "11",
    "10", "9", "8", "7", "6", "5", "4", "3", "2", "1"
];
class GoSVGBuilder {
    constructor(config) {
        this.coordinateSystem = new CoordinateSystem(config.size, 0.8);
        this.config = config;
        this.builder = [];
    }
    renderChess(intersection, type, text) {
        const BLACK_STYLES = "fill:black;stroke:black;";
        const WHITE_STYLES = "fill:white;stroke:black;";
        const [x, y] = this.coordinateSystem.getIntersectionCoordinate(intersection);
        const result = [
            `<circle cx="${x}" cy="${y}" r="18" style="${type ? BLACK_STYLES : WHITE_STYLES}"/>`
        ];
        if (text) {
            const styles = `fill:${type ? "white" : "black"};text-anchor:middle;dominant-baseline:central;`;
            result.push(`<text x="${x}" y="${y}" style="${styles}" font-size="1.2rem">${text}</text>`);
        }
        return result.join("");
    }
    renderMarkers(intersection, text) {
        if (text === "") {
            return "";
        }
        for (const chess of this.config.position.chess) {
            if (chess.intersection === intersection) {
                return "";
            }
        }
        const [x, y] = this.coordinateSystem.getIntersectionCoordinate(intersection);
        return [
            `<circle cx="${x}" cy="${y}" r="10" style="fill:white"/>`,
            `<text x="${x}" y="${y}" style="fill:black;text-anchor:middle;dominant-baseline:central;">${text}</text>`
        ];
    }
    renderBackgroundLayer() {
        return [
            `<g class="background_layer">`,
            `<rect style="fill: white;" x="${0}" y="${0}" width="${this.config.size}" height="${this.config.size}" />`,
            `</g>`,
        ].join("");
    }
    renderBoardLayer() {
        const starsElem = [];
        const stars = this.coordinateSystem.getStarCoordinates();
        for (const star of stars) {
            starsElem.push(`<circle cx="${star[0]}" cy="${star[1]}" r="2.8" />`);
        }
        const labelElem = [];
        if (this.config.label) {
            for (let i = 0; i < 19; i++) {
                const top = this.coordinateSystem.getLabelAndCoordinate("top", i);
                const bottom = this.coordinateSystem.getLabelAndCoordinate("bottom", i);
                const left = this.coordinateSystem.getLabelAndCoordinate("left", i);
                const right = this.coordinateSystem.getLabelAndCoordinate("right", i);
                labelElem.push(`<text font-size="1.4rem" style="text-anchor:middle;dominant-baseline:central;" x="${top[1]}" y="${top[2]}">${top[0]}</text>`);
                labelElem.push(`<text font-size="1.4rem" style="text-anchor:middle;dominant-baseline:central;" x="${bottom[1]}" y="${bottom[2]}">${bottom[0]}</text>`);
                labelElem.push(`<text font-size="1.4rem" style="text-anchor:end;dominant-baseline:central;" x="${left[1]}" y="${left[2]}">${left[0]}</text>`);
                labelElem.push(`<text font-size="1.4rem" style="text-anchor:start;dominant-baseline:central;" x="${right[1]}" y="${right[2]}">${right[0]}</text>`);
            }
        }
        const gridStyles = `stroke:black;stroke-width:1.5;shape-rendering:crispEdges;vector-effect:non-scaling-stroke;`;
        return [
            `<g class="board_layer">`,
            `<path style="${gridStyles}" d="${this.coordinateSystem.getGridPath()}" />`,
            ...starsElem,
            ...labelElem,
            `</g>`,
        ].join("");
    }
    renderStonesLayer() {
        const result = [];
        result.push(`<g class="stones_layer">`);
        for (const stone of this.config.position.chess) {
            result.push(this.renderChess(stone.intersection, stone.type, stone.text));
        }
        result.push(`</g>`);
        return result.join("");
    }
    renderMarkersLayer() {
        const result = [];
        result.push(`<g class="markers_layer">`);
        for (const marker of this.config.position.markers) {
            result.push(this.renderMarkers(marker.intersection, marker.text));
        }
        result.push(`</g>`);
        return result.join("");
    }
    generate() {
        const viewBox = [
            `${this.config.view.offset.x}`,
            `${this.config.view.offset.y}`,
            `${this.config.size - this.config.view.offset.x}`,
            `${this.config.size - this.config.view.offset.y}`,
        ].join(" ");
        this.builder.push(`<svg xmlns="http://www.w3.org/2000/svg" height="100%" viewBox="${viewBox}">`);
        this.builder.push(this.renderBackgroundLayer());
        this.builder.push(this.renderBoardLayer());
        this.builder.push(this.renderStonesLayer());
        this.builder.push(this.renderMarkersLayer());
        this.builder.push(`</svg>`);
        return this.builder.join("");
    }
    ;
}
exports.GoSVGBuilder = GoSVGBuilder;
