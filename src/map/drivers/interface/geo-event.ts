export interface IGeoEventNames {
    click?: string;
    mousedown?: string;
    mouseup?: string;
    mouseenter?: string;
    mouseleave?: string;
    drag?: string;
    dragstart?: string;
    dragend?: string;
    contextmenu?: string;
}

export interface IGeoEventStrategy {
    getNames(): IGeoEventNames;
}
