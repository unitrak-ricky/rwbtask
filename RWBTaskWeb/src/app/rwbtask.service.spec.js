"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var rwbtask_service_1 = require("./rwbtask.service");
describe('RwbtaskService', function () {
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            providers: [rwbtask_service_1.RwbtaskService]
        });
    });
    it('should be created', testing_1.inject([rwbtask_service_1.RwbtaskService], function (service) {
        expect(service).toBeTruthy();
    }));
});
