"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/operator/map");
require("rxjs/add/operator/catch");
require("rxjs/add/observable/throw");
var RwbtaskService = /** @class */ (function () {
    function RwbtaskService(_http) {
        this._http = _http;
        this.baseUrl = 'http://localhost:55341/api/values/';
    }
    RwbtaskService.prototype.getEvents = function () {
        return this._http.get(this.baseUrl + 'getEvents')
            .map(function (resp) { return resp.json(); })
            .catch(this._errorHandler);
    };
    RwbtaskService.prototype._errorHandler = function (error) {
        debugger;
        console.log(error);
        return Observable_1.Observable.throw(error || "Internal server error");
    };
    RwbtaskService = __decorate([
        core_1.Injectable()
    ], RwbtaskService);
    return RwbtaskService;
}());
exports.RwbtaskService = RwbtaskService;
