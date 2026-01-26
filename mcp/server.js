"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs = __importStar(require("node:fs"));
var path = __importStar(require("node:path"));
var os = __importStar(require("node:os"));
var mcp_js_1 = require("@modelcontextprotocol/sdk/server/mcp.js");
var stdio_js_1 = require("@modelcontextprotocol/sdk/server/stdio.js");
var zod_1 = require("zod");
var server = new mcp_js_1.McpServer({
    name: "wonder-blocks-mcp-server",
    version: "1.0.0",
}, {
    capabilities: {
        tools: {},
    },
});
var docsPath = path.join(os.homedir(), "khan", "wonder-blocks", "__docs__");
function listComponents() {
    var components = [];
    var dirs = fs.readdirSync(docsPath, { withFileTypes: true });
    for (var _i = 0, dirs_1 = dirs; _i < dirs_1.length; _i++) {
        var dir = dirs_1[_i];
        if (dir.isDirectory() && dir.name.startsWith("wonder-blocks-")) {
            var contents = fs.readdirSync(path.join(docsPath, dir.name));
            for (var _a = 0, contents_1 = contents; _a < contents_1.length; _a++) {
                var content = contents_1[_a];
                if (content.endsWith(".stories.tsx")) {
                    var name_1 = content.slice(0, content.indexOf(".stories.tsx"));
                    components.push({ component: name_1, package: dir.name });
                }
            }
        }
    }
    return components;
}
function researchComponent(componentNameRaw) {
    var components = listComponents();
    // Convert componentNameRaw to lower kebab-case for matching
    var componentName = componentNameRaw
        .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
        .toLowerCase();
    var componentEntry = components.find(function (c) { return c.component === componentName; });
    if (componentEntry) {
        var packageName = componentEntry.package;
        var packagePath = path.join(docsPath, packageName);
        var contents = fs.readdirSync(packagePath);
        var story = fs.readFileSync(path.join(packagePath, "".concat(componentName, ".stories.tsx")), "utf-8");
        var argTypes = contents.includes("".concat(componentName, ".argTypes.ts"))
            ? fs.readFileSync(path.join(packagePath, "".concat(componentName, ".argTypes.ts")), "utf-8")
            : undefined;
        var a11y = contents.includes("accessibility.mdx")
            ? fs.readFileSync(path.join(packagePath, "accessibility.mdx"), "utf-8")
            : undefined;
        return {
            component: componentName,
            package: packageName,
            story: story,
            argTypes: argTypes,
            accessibility: a11y,
        };
    }
    else {
        throw new Error("Component ".concat(componentName, " not found"));
    }
}
function toTextResult(payload) {
    return {
        content: [
            {
                type: "text",
                text: JSON.stringify(payload),
            },
        ],
    };
}
function toErrorResult(error) {
    var message = error instanceof Error ? error.message : String(error);
    return {
        content: [
            {
                type: "text",
                text: "Error executing tool: ".concat(message),
            },
        ],
    };
}
server.registerTool("list_components", {
    description: "List all of the available WonderBlocks components that a consumer may use",
    inputSchema: zod_1.z.object({}).strict(),
}, function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        try {
            return [2 /*return*/, toTextResult({ content: listComponents() })];
        }
        catch (error) {
            return [2 /*return*/, toErrorResult(error)];
        }
        return [2 /*return*/];
    });
}); });
server.registerTool("list_packages", {
    description: "List all of the available WonderBlocks packages that a consumer may import",
    inputSchema: zod_1.z.object({}).strict(),
}, function () { return __awaiter(void 0, void 0, void 0, function () {
    var packages;
    return __generator(this, function (_a) {
        try {
            packages = Array.from(new Set(listComponents().map(function (c) { return c.package; })));
            return [2 /*return*/, toTextResult({ content: packages })];
        }
        catch (error) {
            return [2 /*return*/, toErrorResult(error)];
        }
        return [2 /*return*/];
    });
}); });
server.registerTool("research_component", {
    description: "Research a Wonder Blocks component and provide relevant information about its usage, props, and best practices. Use kebab-case for the component name.",
    inputSchema: zod_1.z
        .object({
        componentName: zod_1.z
            .string()
            .describe("The name of the Wonder Blocks component to research (e.g., Button, Modal, etc.)"),
    })
        .strict(),
}, function (_a) { return __awaiter(void 0, [_a], void 0, function (_b) {
    var componentName = _b.componentName;
    return __generator(this, function (_c) {
        try {
            return [2 /*return*/, toTextResult(researchComponent(componentName))];
        }
        catch (error) {
            return [2 /*return*/, toErrorResult(error)];
        }
        return [2 /*return*/];
    });
}); });
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var transport;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    transport = new stdio_js_1.StdioServerTransport();
                    return [4 /*yield*/, server.connect(transport)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
main().catch(function (err) {
    // eslint-disable-next-line no-console
    console.error("Error starting Wonder Blocks MCP Server:", err);
    process.exit(1);
});
