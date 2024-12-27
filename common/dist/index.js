"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatepostschema = exports.createpostschema = exports.signupschema = exports.signinschema = void 0;
const zod_1 = require("zod");
exports.signinschema = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string()
});
exports.signupschema = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string(),
    name: zod_1.z.string().optional()
});
exports.createpostschema = zod_1.z.object({
    title: zod_1.z.string(),
    content: zod_1.z.string()
});
exports.updatepostschema = zod_1.z.object({
    title: zod_1.z.string().optional(),
    content: zod_1.z.string().optional(),
    id: zod_1.z.string()
});
