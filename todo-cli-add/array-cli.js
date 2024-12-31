const { Command } = require('commander'); 
const { listen } = require('express/lib/application');
const { json } = require('express/lib/response');
const fs= require('fs');
const program = new Command(); 

let ar=[], no=0;
program
  .name('toDo-cli')
  .description('A simple CLI to add update delete a todo')
  .version('1.0.0');


program
  .command('add')
  .description('addd a todo')
  .argument('<filee>', 'first number')
  .argument('<todo>', 'Second number')
  .argument('<time>', 'Third number')
  .action((filee , todo , time) => {
   new Promise ((r)=>{

   fs.readFile(`array-list.json`, 'utf-8' ,(err , data)=>{
    if(err)return;
    else {
      if(data){
      ar=JSON.parse(data);
      let len=ar.length;
      no=len;}}
      r();
   });
   }).then(()=>{
    return new Promise((r)=>{
      ar.push({
        id:`${++no}`,
        todo:`${todo}`,
        time:`${time}`
       });
      r();
    }).then(()=>{
      fs.writeFile(`${filee}`, `${JSON.stringify(ar)}`, (err)=>{
        if(err)console.log("error");
        else{
          console.log("succcess");
        }
      });
    });
   });
  });


  



program.parse();
