import fs from "fs/promises";
import Lexer from "./Lexer";
import Parser from "./Parser";
import path from "path";

const code = `код РАВНО 5 ПЛЮС 9 ПЛЮС ( 4 МИНУС 6 ПЛЮС ( 7 МИНУС 10 ПЛЮС ( 10 ПЛЮС 15 МИНУС ( 5 МИНУС 1 ) ) ) );
	КОНСОЛЬ код;
	переменная РАВНО код ПЛЮС 3;
	КОНСОЛЬ переменная ПЛЮС код МИНУС 6;`;

const lexer = new Lexer(code);

lexer.analyze();

const parser = new Parser(lexer.tokens);

const rootNode = parser.parseCode();
parser.run(rootNode);

fs.writeFile(path.resolve("./tree.json"), JSON.stringify(rootNode, null, 2));
// parser.run()
