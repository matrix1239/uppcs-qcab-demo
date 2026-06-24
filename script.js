let data=[];

fetch("questions.json")
.then(r=>r.json())
.then(d=>{
  data=d;
});

function loadQuestions(){

 const year=document.getElementById("yearFilter").value;

 let filtered=data;

 if(year){
   filtered=data.filter(q=>q.year==year);
 }

 let html="";

 filtered.forEach(q=>{
   html+=`
   <div class="question">
   <b>${q.paper}</b> | ${q.topic}<br>
   ${q.question}<br>
   Marks: ${q.marks}
   </div>`;
 });

 document.getElementById("questions").innerHTML=html;
}

async function generatePDF(){

 const { jsPDF } = window.jspdf;
 const doc=new jsPDF();

 let y=20;

 data.forEach((q,i)=>{
   doc.text((i+1)+". "+q.question,10,y);
   y+=15;

   for(let j=0;j<8;j++){
     doc.line(10,y,190,y);
     y+=10;
   }

   if(y>250){
     doc.addPage();
     y=20;
   }
 });

 doc.save("UPPCS_QCAB.pdf");
}
