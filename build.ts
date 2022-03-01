import fs from 'fs';
import path from 'path';
import cwd from 'child_process';
const rootDirectory = './vanilla-pages';
const buildDirectory = 'dist';

const main = () => {
  const readdir = fs.readdirSync(path.resolve(rootDirectory));
  readdir.forEach((item) => {
    const html = 'index.html';
    const css = 'index.css';
    const javascript = 'index.js';
    const obj: any = { html: '', css: '', javascript: '' };
    const fileBase = [
      { name: 'html', filename: 'index.html' },
      { name: 'css', filename: 'index.css' },
      { name: 'js', filename: 'index.js' },
    ];
    const fileBaseList = fileBase.map((item) => item.filename);
    fileBase.forEach((fileInfo) => {
      const filename = fileInfo.filename;
      const name = fileInfo.name;
      if (fs.existsSync(path.resolve(rootDirectory, item, filename))) {
        const value = fs.readFileSync(
          path.resolve(rootDirectory, item, filename),
          {
            encoding: 'utf-8',
          },
        );
        obj[name] = value;
      }
    });
    if (!fs.existsSync(path.resolve(buildDirectory, item))) {
      fs.mkdirSync(path.resolve(buildDirectory, item), { recursive: true });
    }
    fs.writeFileSync(
      path.resolve(buildDirectory, item + '.json'),
      JSON.stringify(obj, null, 2),
      { encoding: 'utf-8' },
    );

    const list = fs.readdirSync(path.resolve(rootDirectory, item));
    list.forEach((l) => {
      if (fileBaseList.includes(l)) return;
      cwd.execSync(
        'cp -rf ' +
          path.resolve(rootDirectory, item, l) +
          ' ' +
          path.resolve(buildDirectory, item),
      );
    });
  });
};

main();
