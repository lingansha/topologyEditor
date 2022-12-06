export var EventAction;
(function (EventAction) {
    EventAction[EventAction["Link"] = 0] = "Link";
    EventAction[EventAction["SetProps"] = 1] = "SetProps";
    EventAction[EventAction["StartAnimate"] = 2] = "StartAnimate";
    EventAction[EventAction["PauseAnimate"] = 3] = "PauseAnimate";
    EventAction[EventAction["StopAnimate"] = 4] = "StopAnimate";
    EventAction[EventAction["Function"] = 5] = "Function";
    EventAction[EventAction["GlobalFn"] = 6] = "GlobalFn";
    EventAction[EventAction["Emit"] = 7] = "Emit";
    EventAction[EventAction["StartVideo"] = 8] = "StartVideo";
    EventAction[EventAction["PauseVideo"] = 9] = "PauseVideo";
    EventAction[EventAction["StopVideo"] = 10] = "StopVideo";
    EventAction[EventAction["SendPropData"] = 11] = "SendPropData";
    EventAction[EventAction["SendVarData"] = 12] = "SendVarData";
})(EventAction || (EventAction = {}));
//# sourceMappingURL=event.js.map