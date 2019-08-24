class Student
{
  constructor(s_name,s_roll,title_name,author_name,isbn_no)
  {
  this.s_name=s_name;
  this.s_roll=s_roll;
  this.title_name=title_name;
  this.author_name=author_name;
  this.isbn_no=isbn_no;
  }
}
class UI
{
  addStudent(data){
    let tr=document.createElement('tr');
  tr.className='entry';
  tr.innerHTML=`
    <td>${data.s_name}</td>
    <td>${data.s_roll}</td>
    <td>${data.title_name}</td>
    <td>${data.author_name}</td>
    <td>${data.isbn_no}</td>
    <td><a class="del-btn" href="#" style="cursor:pointer;"><i class="fa fa-remove"></i></a></td>
  `
  books_list.append(tr);
  }
  removeEntries(target){
    console.log(target.parentElement.parentElement);
    if(target.parentElement.classList.contains('del-btn'))
    {
    target.parentElement.parentElement.parentElement.remove();
    }
  }
  clearFields(){
    document.getElementById('student_name').value='',
    document.getElementById('student_rollno').value='',
    document.getElementById('title').value='',
    document.getElementById('author').value='',
    document.getElementById('isbn_no').value='';
  }
  showAlert(message,class_name)
  {
    msg.className=class_name;
    msg.textContent=message;
    msg.style.display='block';
    setTimeout(function(){
      msg.style.display="none";
    },3000);
  }
}
class Store{
  static storeData(input)
    {
      let entries;
      if(localStorage.getItem('Student_entry')===null)
      {
        entries=[];
      }
      else{
       entries=JSON.parse(localStorage.getItem('Student_entry'));
      }
      entries.push(input);
      localStorage.setItem('Student_entry',JSON.stringify(entries));
    }
    static displayData()
    {
      let entries;
      if(localStorage.getItem('Student_entry')===null)
      {
        entries=[];
      }
      else{
       entries=JSON.parse(localStorage.getItem('Student_entry'));
      }
      entries.forEach(function(item)
      {
        let tr=document.createElement('tr');
        tr.className='entry';
        tr.innerHTML=`
          <td>${item.s_name}</td>
          <td>${item.s_roll}</td>
          <td>${item.title_name}</td>
          <td>${item.author_name}</td>
          <td>${item.isbn_no}</td>
          <td><a class="del-btn" href="#" style="cursor:pointer;"><i class="fa fa-remove"></i></a></td>
          `
          books_list.append(tr);
      })
    }
    static removeData(isbn)
    {
      let entries;
      if(localStorage.getItem('Student_entry')===null)
      {
        entries=[];
      }
      else{
       entries=JSON.parse(localStorage.getItem('Student_entry'));
      }
      entries.forEach(function(item,index)
      { 
        if(item.isbn_no===isbn)
        {
        entries.splice(index,1);
        }
      })
      localStorage.setItem('Student_entry',JSON.stringify(entries));
    }
}
let details=document.getElementById('entry-form'),
    books_list=document.getElementById('books-list'),
    msg=document.querySelector('#message');
details.addEventListener('submit',submitEntry);
function submitEntry(e){
  let student_name=document.getElementById('student_name').value,
      roll_no=document.getElementById('student_rollno').value,
      title=document.getElementById('title').value,
      author=document.getElementById('author').value,
      isbn=document.getElementById('isbn_no').value;
  e.preventDefault();
  //create Entry
  const entry=new Student(student_name,roll_no,title,author,isbn);
  //create UI
  const ui=new UI();
  //Validate
  if(student_name==='' || roll_no===''||title===''|| author===''||isbn==='')
  {
    ui.showAlert('Wrong Credentials','error');
  }
  else{
  
  //successful submission
  ui.showAlert('Entry saved Successfully','success');
  //Add New Entry;
  ui.addStudent(entry);
  //Store Data
  Store.storeData(entry);
  //Clear Fields
  ui.clearFields();
  }
}
books_list.addEventListener('click',delEntry);
function delEntry(e){
  const ui=new UI();
  Store.removeData(e.target.parentElement.parentElement.previousElementSibling.textContent);
  ui.removeEntries(e.target);
}
document.addEventListener('DOMContentLoaded',Store.displayData);