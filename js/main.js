
// {/* <script src="https://cdn.jsdelivr.net/npm/flatpickr"> */}
    


    //     // const flatpickr = require("flatpickr");
    // import flatpickr from "../../../../../node_modules/flatpickr/src";
  
   let weeksPast = 0;
   let totalWeek = 0;
    //calculate week you will spend totally
    let weeksTotal ;
    let calculateDay ; 
    let totalTimeSpend ; 
    let totalDaysSpend; //total days you spend
    //calculate week you spent
    let weekSpent ;
    // let calculateDay; 
    let timeSpent; 
    let daysSpent; //days you spent
  //  let totalWeek = 0;
   let clicked = null;
   let events = localStorage.getItem('events') ? JSON.parse(localStorage.getItem('events')) : [];
  //  const newEventModal = document.getElementById('newEventModal');
  const weekTitle = document.querySelector('.week-title');
  const eventTitleInput = document.getElementById('eventTitleInput');
  let eventArray = [];
 
  let modal = document.querySelectorAll('.modal');
  let closeBtn = document.querySelectorAll('.fa-xmark');
  const yearEventModalContainer = document.querySelector('#yearEventModal-container');
  const yearEventModal = document.querySelector('#yearEventModal');
  const yearEvents = document.querySelector('.year-events');
  const yearTitle = document.querySelector('.year-title');

  const newEventModalContainer = document.querySelector("#newEventModal-container");

  let todayDate; 
  let todayDateDay;
  let todayDateMonth;
  let todayDateYear; 

   //birthday 
   let birthDateDay;
   let birthDateMonth;
   let birthDateYear;

   const bucketList = document.querySelector('.bucket-list');
   const bucketContents= document.querySelector('.bucket-contents');
   const bucketContentsList = document.querySelector('.bucket-contents-list');
   let listsInBucket = localStorage.getItem('listsInBucket') ? JSON.parse(localStorage.getItem('listsInBucket')) : [];
   let finishedLists = localStorage.getItem('finishedLists') ? JSON.parse(localStorage.getItem('finishedLists')) : [];
  //  let attachedLists = localStorage.getItem('attachedLists') ? JSON.parse(localStorage.getItem('attachedLists')) : [];
   let countLists = localStorage.getItem('countLists') ? JSON.parse(localStorage.getItem('countLists')) : [];
  let eventsInYear = localStorage.getItem('eventsInYear') ? JSON.parse(localStorage.getItem('eventsInYear')) : [];
   let bday = localStorage.getItem('bday') ? JSON.parse(localStorage.getItem('bday')) : [];
   let eday = localStorage.getItem('eday') ? JSON.parse(localStorage.getItem('eday')) : [];
   const inputList = document.querySelector('.input-list');
   const addBtn = document.querySelector('.add-btn');

    
   function saveCountLists() {
     
     countLists.push({
       id : `list-${countLists.length+1}`
     });

     localStorage.setItem('countLists', JSON.stringify(countLists));
   }

   //add list to bucket
    addBtn.addEventListener('click', ()=>{
      if(!inputList.value || !inputList.value.match(/\S/g) ){return}
      else {
      saveCountLists();
      const div = document.createElement('div');
      div.classList.add('list-in-bucket')
      div.classList.add('draggable');
      div.setAttribute ('draggable', 'true') ;
      div.dataset.num =`list-${countLists.length}`;
      div.innerHTML = `<li>${inputList.value}</li>`;
      const deleteBtn = document.createElement('i');
      const finishBtn  = document.createElement('i');
      deleteBtn.setAttribute('class', 'fas fa-trash-alt');
      finishBtn.setAttribute('class', 'fas fa-check' );
      div.appendChild(deleteBtn);
      div.appendChild(finishBtn);

      bucketContentsList.appendChild(div);
        inputList.value = "";
       saveList(div); 
       draggable();
      }
    })

    //add eventlistner to parent element of list to delete list
    bucketContentsList.addEventListener('click', deleteList);
    bucketContentsList.addEventListener('click', finishedList);
    yearEvents.addEventListener('click', deleteList);
    yearEvents.addEventListener('click', finishedList);


 //save list in localstorage
 function saveList(list) {
  listsInBucket.push({
    id: list.dataset.num,
    title: list.innerText,
  });
 
   
  //save list to localstorage
  localStorage.setItem('listsInBucket', JSON.stringify(listsInBucket));
}

function saveFinishedLists(list){
  finishedLists.push({
    id:list.dataset.num,
    title: list.innerText,
  });

  localStorage.setItem('finishedLists', JSON.stringify(finishedLists));
}

function saveBday(date){
  bday.push({
    date:date
  });

  localStorage.setItem('bday', JSON.stringify(bday));
}

function saveExpectedday(date){
  eday.push({
    date:date
  });

  localStorage.setItem('eday', JSON.stringify(eday));
}
//save attachedLists to localstorage
// function saveAttachedLists(list) {
//   attachedLists.map((li, i)=>{
//     //if already the list was saved in localstorage, delete it and save the new version. 
//     if(li.id == list.dataset.num){
//        attachedLists.splice(i, 1);
//     }
//   })
//   attachedLists.push({
//     id: list.dataset.num,
//     title: list.innerText,
//     position: list.style.position,
//     leftPosition: list.style.left,
//     topPosition: list.style.top,
//     width: list.style.width,
//     height: list.style.height,

//   });

//   localStorage.setItem('attachedLists', JSON.stringify(attachedLists));
// }
//get lists from localstorage and display
function displayLists(){
  if(listsInBucket){
    listsInBucket.map((list, i) => {
    const listDiv = document.createElement('div');
    listDiv.classList.add('list-in-bucket');
    listDiv.classList.add('draggable');
    listDiv.setAttribute ('draggable', 'true') ;
    listDiv.dataset.num =  list.id;
    listDiv.innerHTML = `<li>${list.title}</li>`;
    
     const deleteBtn = document.createElement('i');
     const finishBtn = document.createElement('i');
     deleteBtn.setAttribute('class', 'fas fa-trash-alt');
     finishBtn.setAttribute('class', 'fas fa-check' )
     listDiv.appendChild(deleteBtn);
     listDiv.appendChild(finishBtn);
     bucketContentsList.appendChild(listDiv);

     //if it's finishedlist, add class of finished-list
     if(finishedLists){
     finishedLists.map((finishedList, i)=>{
       if(list.id == finishedList.id){
        listDiv.classList.add('finished-list');
       }
     })
     };
    
  })
  } 
  //  if(attachedLists) {
  //   attachedLists.map((attachedList, index)=>{
    
  //       const listDiv = document.createElement('div');
  //       console.log('attached exist')
  
  //       listDiv.classList.add('draggable');
  //       listDiv.setAttribute ('draggable', 'true') ;
  //       listDiv.dataset.num =  attachedList.id;
  //       listDiv.innerHTML = `<li>${attachedList.title}</li>`;
        
  //        const deleteBtn = document.createElement('i');
  //        const finishBtn = document.createElement('i');
  //        deleteBtn.setAttribute('class', 'fas fa-trash-alt');
  //        finishBtn.setAttribute('class', 'fas fa-check' )
  //        listDiv.appendChild(deleteBtn);
  //        listDiv.appendChild(finishBtn);
  //       // bucketContentsList.removeChild(listDiv);
  //       listDiv.classList.add('list-on-squares');
  //       listDiv.style.top = attachedList.topPosition;
  //       listDiv.style.left = attachedList.leftPosition;
  //       listDiv.style.position = attachedList.position;
  //       listDiv.style.width = attachedList.width;
  //       listDiv.style.height = attachedList.height;
  //       // listDiv.dataset.num = attachedList.id;
   
  //       console.log('ths is on calendar')     
  //       let icons = listDiv.querySelectorAll('.fas');
  //       icons.forEach(icon => {
  //       icon.style.display = 'none';
  //  })
  //       squares.appendChild(listDiv);
  //       //to hidden same id list that is created in  "if(listsInBucket)" condition above.
  //       // listDiv.style.display = 'none';
       
  //    //if it's finishedlist, add class of finished-list
  //    if(finishedLists){
  //     finishedLists.map((finishedList, i)=>{
  //       if(attachedList.id == finishedList.id){
  //        listDiv.classList.add('finished-list');
  //       }
  //     })
  //     };
      
  //   })
  // } 
      draggable();
     
} 

//delete from bucketlist
function deleteList(e){
  let deleteBtn = document.querySelectorAll('.fa-trash-alt');
  
  let targetBtn = [...deleteBtn].find((btn, i) => {
    return e.target == btn
  })
  // deleteBtn.forEach((btn,i)=>{
  //   if(e.target == btn){
     if(targetBtn){
      let targetList = e.target.parentElement;
       console.log(targetList)
      targetList.classList.add('deleted-list');
      targetList.addEventListener('transitionend', ()=>{
        targetList.remove();
      });
      //delete from localstorage
      if(targetList.classList.contains('list-in-bucket')){
      // listsInBucket.forEach((list,index)=> {
        let findList = listsInBucket.findIndex(list => {
          return list.id == targetList.dataset.num
        })

          listsInBucket.splice(findList, 1);
          localStorage.setItem('listsInBucket', JSON.stringify(listsInBucket));
      
        
      // })
    }else if(targetList.classList.contains('list-on-year')){
      // listsInBucket.forEach((list,index)=> {
        let findList = eventsInYear.findIndex(list => {
         return list.id == targetList.dataset.num
        })
          console.log(findList)
          eventsInYear.splice(findList, 1);
          localStorage.setItem('eventsInYear', JSON.stringify(eventsInYear));
      
    }
  //   } 
  // })
  }
}

//mark as finished 
function finishedList(e){
  let finishBtn = document.querySelectorAll('.fa-check');
  let targetList = e.target.parentElement;
  finishBtn.forEach((btn,i)=>{
    if(e.target == btn){
      console.log(e.target);
      console.log(btn)
      targetList.classList.toggle('finished-list');
      if(targetList.classList.contains('finished-list')){
        saveFinishedLists(targetList);
      }else{
       let targetIndex = finishedLists.findIndex(list => {
          return list.id == targetList.dataset.num;
        })
        console.log(targetIndex)
        finishedLists.splice(targetIndex, 1);
        localStorage.setItem('finishedLists', JSON.stringify(finishedLists));
      }
     
    };
  })
    
  
   
  
}
//render list when browser is reloaded 
 document.addEventListener('DOMContentLoaded', displayLists);

 
 function draggable(){ 

   const draggableLists = document.querySelectorAll('.draggable:not(.dragging)');
   draggableLists.forEach(list => {
    list.addEventListener('dragstart', (e)=>{
      // e.dataTransfer.effectAllowed = "copyMove";
      list.classList.add('dragging')} ) ;

    list.addEventListener('dragend', ()=>{
        list.classList.remove('dragging');
      });
   
      // target elements events
    list.addEventListener('dragover', function(e){                                        
       e.preventDefault();
      
    let draggingList = document.querySelector('.dragging');
    if(draggingList != this) {this.classList.add('dragover')};
    const draggableLists = document.querySelectorAll('.draggable:not(.dragging)');
    let rect = this.getBoundingClientRect();
    
    draggableLists.forEach((list, i)=> {
    
      //もしドラッグしてる要素がthisじゃない、かつthisのおや要素がlistと同じ場合
      if(list != this && this.parentElement == list.parentElement){
          if( rect.top < list.getBoundingClientRect().top){
            list.style.transform = `translateY(${draggingList.clientHeight/4}px)`;
          }
          else{
            list.style.transform = `translateY(-${draggingList.clientHeight/4}px)`;
          }
        }
       })
     });

     list.addEventListener('drop', function(e) {
  
       const draggableLists = document.querySelectorAll('.draggable:not(.dragging)');
       let draggingList = document.querySelector('.dragging');
       let rect = this.getBoundingClientRect();
      //  putAttachedListBack(draggingList, draggableLists);
       if(((e.clientY - rect.top) - (this.clientHeight / 2)) < 0){
        this.parentElement.insertBefore(draggingList, this);
        console.log(draggingList);
          console.log(this)
       }
       else {
         this.parentElement.insertBefore(draggingList, this.nextSibling);
       }
     
       //if you add list in year modal, delete from listsInBucket local storage, and vice versa
        deleteFromStorage(draggingList);
         
        //save lists to local storage everytime when you sort lists
        listsInBucket.splice(0);
        if(bucketContentsList.childElementCount){
        [...bucketContentsList.children].map((el,i) =>{
          saveList(el) 
          console.log('add classlist bucket')
          // el.classList.add('list-in-bucket')      
         })
        }else{
          localStorage.setItem('listsInBucket', JSON.stringify(listsInBucket));
          // deleteFromBucketStorage(draggingList,eventsInYear );
        }

      // }   //save lists to local storage everytime when you sort lists
      // else if(draggingList.parentElement == yearEvents){
        eventsInYear.splice(0);
        if(yearEvents.childElementCount){
          // draggingList.classList.add('list-on-year');
          // deleteFromBucketStorage(draggingList,listsInBucket);
        [...yearEvents.children].map((el, i) => {
          
          saveYearEvents(el);
          // el.classList.add('list-in-year');
        });
      }else{
        localStorage.setItem('eventsInYear', JSON.stringify(eventsInYear));
        // deleteFromBucketStorage(draggingList,eventsInYear );
      }
        // if(!bucketContentsList.childElementCount){
        //   deleteFromBucketStorage(draggingList, listsInBucket);
        // }
        // if(!yearEvents.childElementCount){
        //   deleteFromBucketStorage(draggingList, eventsInYear);
        // }
      // }

       draggableLists.forEach((list, i)=> {
        list.style.transform = `translateY(0px)`;
     })
       this.classList.remove('dragover');     
      });
    

     list.addEventListener('dragleave',function(e){
       list.classList.remove('dragover');
       const draggableLists = document.querySelectorAll('.draggable:not(.dragging)');
       draggableLists.forEach((list, i)=> {
        list.style.transform = `translateY(0px)`;
     })
     });
  } )
 }

 bucketContentsList.addEventListener('dragover', function(e){
   e.preventDefault();
 });

 bucketContentsList.addEventListener('dragenter', function(e){
  e.preventDefault();
});
bucketContents.addEventListener('dragover', function(e){
  e.preventDefault();
});

bucketContents.addEventListener('dragenter', function(e){
 e.preventDefault();
});


bucketContents.addEventListener('drop', function(e){
  const draggableLists = document.querySelectorAll('.draggable:not(.dragging)');
 
  let draggingList = document.querySelector('.dragging');

  //if there is no list in bucket
  // let noListsInBucket = [...draggableLists].every(li => {
  //   return !li.classList.contains('list-in-bucket') 
  // });
  // if(noListsInBucket && ){
  //   console.log('no list')
  //   putAttachedListBack(draggingList, draggableLists)  
  //   saveList(draggingList);
  // }

  if(!bucketContentsList.childElementCount){
    console.log('no lists in bucket')
    bucketContentsList.appendChild(draggingList);
    // draggingList.classList.add('list-in-bucket');
    // putAttachedListBack(draggingList, draggableLists)  
    deleteFromStorage(draggingList)
    saveList(draggingList);
  };
  
})

document.querySelector('.add-list').addEventListener('drop', function(e){
  e.stopPropagation();
})
function putAttachedListBack(draggingList, draggableLists){
  
  // if(draggingList.classList.contains('list-on-squares') || draggingList.classList.contains('list-on-year')){
    //if there is list that has same id as dragginglist, display = flex;(after reload)
    // draggableLists.forEach((list,i)=>{
    //   if(list.dataset.num == draggingList.dataset.num) {
    //     list.style.display = "none";
    //     // list.classList.add('list-in-bucket')
    //     // draggingList.style.display = 'none';
    //   };
      
    // });
 
     //if there is no list that has same id as dragginglist,set style(it means same id doesn't exist in bucket before reload when you drop attachedlist in bucket)
    //  let ListNoExists = ([...draggableLists].every(list =>{
    //  return  list.dataset.num != draggingList.dataset.num;
    //  }));
  

    //   if(ListNoExists){
  
      bucketContentsList.appendChild(draggingList);
   
      // draggingList.style.display = 'flex';
    //   draggingList.style.position = 'relative';
    //   draggingList.style.top = '0px';
    //   draggingList.style.left = '0px';
    //   draggingList.style.width = '100%';
    //   draggingList.style.height = 'auto';
    //  let icons = draggingList.querySelectorAll('.fas');
   
    //  icons.forEach(icon => {
    //    icon.style.display = 'inline';
    //  })
    //  };
      
    //if you drag the list from calender, delete 'list-on-squares' class
    //  if(draggingList.classList.contains('list-on-squares')){
    //   let draggingListIndex = attachedLists.findIndex(list => {
    //     return list.id == draggingList.dataset.num;
    //   })
    //   attachedLists.splice(draggingListIndex,1);
    //   localStorage.setItem('attachedLists', JSON.stringify(attachedLists));
    //   draggingList.classList.remove('list-on-squares');
    //  }  //or if you drag the list from year modal, delete 'list-on-year' class

      console.log('delete from year local storage')
      let draggingListIndex = eventsInYear.findIndex(list => {
        return list.id == draggingList.dataset.num;
      });
      eventsInYear.splice(draggingListIndex, 1);
      localStorage.setItem('eventsInYear', JSON.stringify(eventsInYear));
      draggingList.classList.remove('list-on-year');
     
     
     draggingList.classList.add('list-in-bucket');

//  };
}
 
const squares = document.querySelector('.squares');
const pastSquares = document.querySelector('.past-squares');
const futureSquares = document.querySelector('.future-squares');
const allSquares = document.querySelectorAll('.all-squares')

  //drop list to calendar
// squares.addEventListener('drop', function(e){
//   // e.preventDefault();
//   console.log('list is dragged')
//   let draggingList = document.querySelector('.dragging');

//   let listWidth = draggingList.clientWidth;
//   let listHeight = draggingList.clientHeight;
//   squares.append(draggingList);
//   draggingList.style.position = 'absolute';
//   draggingList.style.width = listWidth + 'px';
//   draggingList.style.height = listHeight + 'px';

//   draggingList.classList.add('list-on-squares');
//   //set display:none for trash icon & check icon
//   const icons = draggingList.querySelectorAll('.fas');
//   icons.forEach((icon, i)=> {
//     icon.style.display = 'none';
//   })
  
//   let x = e.pageX;
//   let y =  e.pageY;

//   draggingList.style.left = x - draggingList.offsetWidth/6 + 'px';
//   draggingList.style.top = y - draggingList.offsetHeight/6 + 'px';

 
//   saveAttachedLists(draggingList);

//    // if you drag list from bucketlist, delete list-in-bucket class 
//    deleteFromBucketStorage(draggingList);
 

// });

//delete list from listInBucket local storage
function deleteFromStorage(draggingList){

  if(draggingList.parentElement == yearEvents){
    let draggingListIndex = listsInBucket.findIndex(list => {
      return list.id == draggingList.dataset.num;
    });

    draggingList.classList.add('list-on-year');
    draggingList.classList.remove('list-in-bucket');

    console.log(draggingListIndex)
    listsInBucket.splice(draggingListIndex,1);
    localStorage.setItem('listsInBucket', JSON.stringify(listsInBucket));
  }else if(draggingList.parentElement == bucketContentsList){
    let draggingListIndex = eventsInYear.findIndex(list => {
      return list.id == draggingList.dataset.num;
    });
    
    draggingList.classList.add('list-in-bucket');
    draggingList.classList.remove('list-on-year');

    console.log(draggingListIndex)
    eventsInYear.splice(draggingListIndex,1);
    localStorage.setItem('eventsInYear', JSON.stringify(eventsInYear));
  }
}
  // squares.addEventListener('dragend', ()=>{
  //   let draggingList = document.querySelector('.dragging');
  //   draggingList.classList.remove('dragging');
  // });

squares.addEventListener('dragover', function(e){
     e.preventDefault();

 
  })

  squares.addEventListener('dragenter', function(e){
    e.preventDefault();
  
  })

  
  
let weekArray = [];
let yearArray = [];

  let config1;
  //if previous input exsists, use it as defaultDate
  let defaultDate = localStorage.getItem('bday')? bday.pop().date : null;
    //from your birthday to today
     config1 = {
        altInput: true,
        altFormat: "F j, Y",
        dateFormat: "Y-m-d",
        allowInput: true, //to reset "readonly" and you can directly input 
        defaultDate: defaultDate,
        onChange: function(selectedDates) {
  
    // document.querySelector('.displayBDay').innerHTML = `<span>Your Birthday : ${birthday.formatDate(birthday.selectedDates[0], 'd.m.Y')} </span>`
// if(bday){
//   saveBday(bday);
//    //birthday 
//    birthDateDay = bday.getDate();
//    birthDateMonth = bday.getMonth()+1;
//    birthDateYear = bday.getFullYear();
// }else{
    saveBday(birthday.selectedDates[0]);
    //birthday 
    birthDateDay = birthday.selectedDates[0].getDate();
    birthDateMonth = birthday.selectedDates[0].getMonth()+1;
    birthDateYear = birthday.selectedDates[0].getFullYear();
// }
    // today 
    todayDate = new Date();
    todayDateDay =todayDate.getDate();
    todayDateMonth =todayDate.getMonth()+1;
    todayDateYear =todayDate.getFullYear();

    //calculate age
    let calculatedAge = 0;
    if(todayDateMonth > birthDateMonth) {
       calculatedAge = todayDateYear - birthDateYear;
       console.log(calculatedAge)
   } else if(todayDateMonth == birthDateMonth){
       if(todayDateDay >= birthDateDay){
           calculatedAge = todayDateYear - birthDateYear;
           console.log(calculatedAge)
       }else{
           calculatedAge = todayDateYear - birthDateYear -1;
           console.log(calculatedAge)
       }
   }
   else {calculatedAge =  todayDateYear - birthDateYear - 1;
    console.log(calculatedAge) };

    const yourAge = document.querySelector('.age');
    // yourAge.innerText = `Your age is ${calculatedAge}`;
    
    //calculate week you spent
    weekSpent = document.querySelector('.weekSpent');
    calculateDay = 1000*60*60*24; 
    timeSpent = todayDate - birthday.selectedDates[0]; 
    daysSpent = Math.floor(timeSpent/calculateDay); //days you spent
    console.log(daysSpent); 

    weeksPast = Math.floor(daysSpent / 7); //weeks you spentdaysSpent
    console.log(weeksPast);
    weekSpent.innerHTML = `<span class="each-info">From your birthday to current week :</span> <span class="each-answer">${weeksPast} weeks</span>`
    return weeksPast;

  }

}
    
let futureDateDay; 
let futureDateMonth; 
let futureDateYear;
let config2;
let expectedDayArray = [];
//if previous input exsists, use it as defaultDate
let defaultEDate =localStorage.getItem('eday') ? eday.pop().date : null;
//from birthday to expected day 
   config2 = {
    altInput: true,
    altFormat: "F j, Y",
    dateFormat: "Y-m-d",
    allowInput: true, //to reset "readonly" and you can directly input 
    defaultDate : defaultEDate,
    onChange: function(selectedDates) {
        // document.querySelector('.displayExpectedDay').innerHTML = expectedDay.formatDate(expectedDay.selectedDates[0], 'd.m.Y');
     
      console.log(expectedDay.selectedDates[0])
      expectedDayArray.push(expectedDay.selectedDates[0]);
      saveExpectedday(expectedDay.selectedDates[0]);
       
      // expected day 
      futureDateDay = expectedDay.selectedDates[0].getDate();
      futureDateMonth = expectedDay.selectedDates[0].getMonth()+1;
      futureDateYear = expectedDay.selectedDates[0].getFullYear();
  
      //calculate age
      let calculatedAge = 0;
      if(futureDateMonth > birthDateMonth) {
         calculatedAge = futureDateYear - birthDateYear;
         console.log(calculatedAge)
     } else if(futureDateMonth == birthDateMonth){
         if(futureDateDay >= birthDateDay){
             calculatedAge = futureDateYear - birthDateYear;
             console.log(calculatedAge)
         }else{
             calculatedAge = futureDateYear - birthDateYear -1;
             console.log(calculatedAge)
         }
     }
     else {calculatedAge =  futureDateYear - birthDateYear - 1;
      console.log(calculatedAge) };
  
      const yourExpectedAge = document.querySelector('.expectedAge');
      yourExpectedAge.innerHTML = `<span class="each-info">Your age on ${expectedDay.formatDate(expectedDay.selectedDates[0], 'd.m.Y')} :</span> <span class="each-answer"> ${calculatedAge} years old </span>`
  
      //calculate week you will spend totally
      weeksTotal = document.querySelector('.weeks-total');
      calculateDay = 1000*60*60*24; 
      totalTimeSpend = expectedDay.selectedDates[0] - birthday.selectedDates[0]; 
      totalDaysSpend = Math.floor(totalTimeSpend/ calculateDay); //total days you spend  
      totalWeek = Math.floor(totalDaysSpend / 7); //total weeks you spend
      console.log(totalDaysSpend) 
       //if futureDate is past date
       let todayDate = new Date();
       if(futureDateYear < todayDate.getFullYear()){
        weeksTotal.innerText = `Please input future date. Don't look back past!` 
       }else if(futureDateYear == todayDate.getFullYear()){
         if(futureDateMonth < todayDateMonth){
          weeksTotal.innerText = `Please input future date. Don't look back past!` 
         } else if(futureDateMonth == todayDateMonth){
           if(futureDateDay < todayDateDay){
            weeksTotal.innerText = `Please input future date. Don't look back past!` 
           } else {
            weeksTotal.innerHTML = `<span class="each-info"> From your birthday to ${expectedDay.formatDate(expectedDay.selectedDates[0], 'd.m.Y')} :</span><span class="each-answer"> ${totalWeek} weeks </span>` 
           }
         }
       }
       else{weeksTotal.innerHTML =  `<span class="each-info"> From your birthday to ${expectedDay.formatDate(expectedDay.selectedDates[0], 'd.m.Y')} :</span><span class="each-answer"> ${totalWeek} weeks</span>`  };
  
       //rest of weeks 
       let restWeeks = totalWeek - weeksPast;
       const weeksFuture = document.querySelector('.weeks-future');
       weeksFuture.innerHTML = `<span class="each-info">From current week to ${expectedDay.formatDate(expectedDay.selectedDates[0], 'd.m.Y')} : </span> <span class="each-answer">${restWeeks} weeks</span>`;
       
       //display squares
      // if(expectedDayArray[expectedDayArray.length-2] != expectedDayArray[expectedDayArray.length-1] || (reloadFlag = true) )
      // {
        // console.log(expectedDayArray[expectedDayArray.length-1]);
        // console.log(expectedDay.selectedDates[0])
      console.log('displayweek invoked')
       displayWeeks(totalWeek);
      // }
      //  return totalWeek;
    }   
  }
     
 
        
  //display squares (from birthday to expected day)
 
  let weekDiv;
  
  
  function displayWeeks(totalWeek){
  pastSquares.innerHTML = '';
  futureSquares.innerHTML = '';
    console.log('weekarray has length', totalWeek)
    let restWeek = totalWeek - weeksPast;
    let i;
    let count = 0;
    console.log(weeksPast);

  for( i = 1; i <= totalWeek; i++){
      weekDiv = document.createElement('div');
      weekDiv.classList.add('week');   
      weekDiv.id =`week${i}`;
      weekArray.push(weekDiv);



      displayEvents(weekDiv, i);
       


      // squares.appendChild(weekDiv);
      
      // if(i%52 == 0){
    
      //      console.log(` ${i/52} `)
      //      const aYear = document.createElement('div');
      //      aYear.classList.add('a-year');
      //      aYear.innerText = ` ${i / 52}`;
      //      squares.appendChild(aYear);
      //   }
        //indicate past week by pink color
        //let counter = i + ;
      if(i < weeksPast) {
          weekDiv.classList.add('past-week');
          pastSquares.appendChild(weekDiv);

          putYearFlag(pastSquares);

        //  if(i%365 == 0){
        //   console.log(` ${i/364+6} `)
        //   const aYear = document.createElement('div');
        //   aYear.classList.add('a-year');
        //   aYear.setAttribute('id', `year-${i/364+6}`)
        //   aYear.innerText = ` ${i/364+6}`;
        //   yearArray.push(aYear);
        //   pastSquares.appendChild(aYear);
        //  }
        //   if(i % 52 == 0){console.log(` ${i/52} `)
        //    const aYear = document.createElement('div');
        //    aYear.classList.add('a-year');
        //    aYear.innerText = ` ${i/52}`;
        //    squares.appendChild(aYear);
        // }
        
          console.log(`this is past ${i} week`);
        }    //indicate  current week by different color and size
        else if(i == weeksPast) {
          weekDiv.classList.add('current-week');
          
          pastSquares.appendChild(weekDiv);
          
          putYearFlag(futureSquares);
   
        }  //indicate past week by pink color
        else {
          weekDiv.classList.add('future-week');
          futureSquares.appendChild(weekDiv);
       
          putYearFlag( futureSquares);
        } ;
        
        
      }

      //usually 1 year is 52weeks, but to offset, 1 year is 53weeks once in 7years.
      function putYearFlag(squareSection){
      
        if((i-count)%52 == 0 && !((i-count)%364 == 0)){
          const aYear = document.createElement('div');
          aYear.classList.add('a-year');
          aYear.setAttribute('id', `year-${(i-count) / 52}`)
          aYear.innerText = ` ${(i-count) / 52}`;
          yearArray.push(aYear);
          squareSection.appendChild(aYear);
     }else if(i% 365 == 0){
      const aYear = document.createElement('div');
      aYear.classList.add('a-year');
      aYear.setAttribute('id', `year-${i / 365* 7}`)
      aYear.innerText = ` ${i / 365 * 7}`;
      yearArray.push(aYear);
      squareSection.appendChild(aYear);
      count++;
 
     }
      }
  
      //add eventListner to each squares to open modal window
      weekArray.forEach((week, index) => {
        week.addEventListener('click', function(){
        openModal(week, index);
        })
      });
    //add eventListner to each years to open modal window
      yearArray.forEach((year, index)=>{
        //if event exsit in year, add 'year-event-exist' class 
        if(eventsInYear){
          eventsInYear.map((list, i)=>{
            if(list.year == year.id){
              year.classList.add('year-event-exist');
            }
          })
        }
        year.addEventListener('click', function(){
          openYearModal(year, index)
        })
      })
     
  };


let eventForWeek; 
let eventForYear;
let clickedYear;
let clickedArray = [];
 function openModal(week, index) {
   clicked = week;
  
   console.log(clicked);
   //if events already exist in a clicked week, get event title from events(localstorage)
   eventForWeek = events.find(e => e.week == clicked.id);
   console.log(eventForWeek);
   if(eventForWeek) {
    eventTitleInput.value = eventForWeek.title;
   }else {
     let findWeek = clickedArray.find((el)=>{
       return el.week == clicked.id
     });
     if(findWeek){
       eventTitleInput.value = findWeek.title;
     }else {
    eventTitleInput.value = '';
     }
   } 

   newEventModalContainer.style.display = 'block';
   weekTitle.innerText = `Week ${clicked.id.split('week')[1]}`;
   bucketList.style.zIndex = '0';
  

 }

 let saveBtn = document.querySelector('.saveButton');
saveBtn.addEventListener('click',()=>{
  if(!eventTitleInput.value || !eventTitleInput.value.match(/\S/g) ){
      if(eventForWeek){
        clicked.classList.remove('event-exist');
      
       //  clicked.classList.add('no-event');
        events.splice(events.findIndex(e => e.week == clicked.id), 1);
        localStorage.setItem('events', JSON.stringify(events));
      }else{
        return
      }
  }  
else{
 saveEvent();
}
});

let weekDeleteBtn = document.querySelector('.week-delete-button');

weekDeleteBtn.addEventListener('click', ()=>{
  // eventForWeek = events.find(e => e.week === clicked.id);
  if(eventForWeek){
    clicked.classList.remove('event-exist');

    events.splice(events.findIndex(e => e.week == clicked.id), 1);
    localStorage.setItem('events', JSON.stringify(events))
  }
   console.log(events);
  eventTitleInput.value = '';
  displayEvents(clicked, clicked.id.split('week')[1]);
})

//  function closeModal() {
//    newEventModalContainer.style.display = 'none';
//    //set textarea as blank for next time (if it's not set as blank, previous text will show up)
//    eventTitleInput.value = '';
//   //  console.log(clicked);
//   //  clicked = null;
//   // displayEvents(clicked);
//  }

 function openYearModal(year, index) {
  clickedYear = year;

  yearEventModalContainer.style.display = 'block';
  yearTitle.innerText = `Year ${clickedYear.id.split('year-')[1]}`;

  //if events already exist in a clicked week, get event title from events(localstorage)
  eventForYear = eventsInYear.find(e => e.year == clickedYear.id);
  
  //call all eventListners of yearEvents
  yearEventListeners();

  displayYearEvents(clickedYear);
  draggable();

 
  //set z-index for bucketlist if you click year. (so you can drag list from bucketlist to yearmodal)
  bucketList.style.zIndex = '2';
  bucketContents.classList.add('show-modal');
}

function yearEventListeners(){
yearEvents.addEventListener('drop', function(){
   
  const draggableLists = document.querySelectorAll('.draggable:not(.dragging)');
  let draggingList = document.querySelector('.dragging');
 

  //if there is no list in year, append it to yearEvents
  if(!yearEvents.childElementCount){
    // draggingList.classList.add('list-on-year');
    yearEvents.appendChild(draggingList);
    saveYearEvents(draggingList);
   
  //delete from listinBucket local storage
  deleteFromStorage(draggingList);
  };





 
  })

  yearEvents.addEventListener('dragover', function(e){
    e.preventDefault();
  });

  yearEvents.addEventListener('dragenter', function(e){
     e.preventDefault();
  })
}


function closeModal(e){
closeBtn.forEach((btn, i) => {
  if(e.target == btn) {
    let targetModal = e.target.parentElement.parentElement;
    targetModal.style.display = 'none';  
    if(targetModal == yearEventModalContainer)  {
      checkYearEvents(); 
      bucketContents.classList.remove('show-modal');   
    }else {
      checkClickedArray()
    }
  }
})
}


window.addEventListener('click', closeModal);


window.addEventListener('click', clickOutside);



//close if you click outside of modal
function clickOutside(e){

  modal.forEach((targetModal, i) => {
    if(e.target == targetModal || e.target == bucketList){
      targetModal.style.display = 'none';
      bucketContents.classList.remove('show-modal');   
      if(e.target == yearEventModalContainer)  {
        checkYearEvents(); 
      
      }else {
        checkClickedArray()
      }
    };
  
  })
  
  }

  //if you input text in weekmodal, and close accidently, text is still in modal when you open modal again.
  function checkClickedArray() {
    //check if there is element that has same id as clicked week in clickedArray
    if(clickedArray.length){
      let findClickedWeek = clickedArray.find(el=>
        {
          return el.week == clicked.id
        }
      )
      if(findClickedWeek){
        console.log('same',  clicked.id)
        clickedArray.splice(clickedArray.indexOf(findClickedWeek), 1);
      
        
      }
  }  //iif there is text in week modal, push in clickedArray
  if(eventTitleInput.value){
  clickedArray.push({
    week:clicked.id,
    title: eventTitleInput.value
  })
}
  console.log(clickedArray);
  }

  //if year event exists, change color of year flag when you close year modal
  function checkYearEvents() {
    if(yearEvents.childElementCount){
      clickedYear.classList.add('year-event-exist');
    }else{
      clickedYear.classList.remove('year-event-exist');
    }
  }
 //save events to localstorage
 function saveEvent() {
   
   if(eventTitleInput.value) {
     //if clicked week is already exsists in events(localstorage), overwrite it.
     if(eventForWeek){
       eventForWeek.title = eventTitleInput.value;
     }
     //if cliekd weeks is not exsists in events(localstorage), push it to events
     else{
     events.push({
       week: clicked.id,
       title: eventTitleInput.value,
     });
    }
    //if you delete texts, delete from localstorage and remove event-exist class.
   }
   console.log(clicked);
   //save events to localstorage
   localStorage.setItem('events', JSON.stringify(events));
  //  closeModal();

   displayEvents(clicked, clicked.id.split('week')[1]);
  //  document.querySelectorAll('.event').forEach(event => {event.addEventListener('click', ()=>{console.log(event.innerText)})});
 }


 //display events in speech bubbles
 function displayEvents(week, i) {
   week.innerHTML = '';
  eventForWeek = events.find(e => e.week === week.id);
  console.log(eventForWeek);
 
  if(eventForWeek) {
      const eventDiv = document.createElement('div');
      eventDiv.classList.add('event');
      let eachTexts = eventForWeek.title.split('\n');
       let lists = eachTexts.map(list => {
        let div = document.createElement('div'); 
        if(list == ''){
          return div.innerHTML += `<br>`;
        }else{
        return div.innerHTML += `<li style="word-wrap: break-word">${list}</li>`;
        }

       }).join('');

      eventDiv.innerHTML = `<h4 class="week-num">${week.id}</h4>
      <div class="event-text">${lists}</div>`;
      week.classList.add('event-exist');
      week.appendChild(eventDiv);
      eventArray.push(eventDiv);
   
  }else {
    const noEventDiv = document.createElement('div');
    noEventDiv.classList.add('no-event');
    noEventDiv.innerHTML = `week<br>${i}`;
    week.appendChild(noEventDiv);
  }
 }

 function saveYearEvents(draggingList) {
     eventsInYear.push({
       id: draggingList.dataset.num,
       title: draggingList.innerText,
       year: clickedYear.id
     });
    
     localStorage.setItem('eventsInYear', JSON.stringify(eventsInYear));
 }

 //display events in year modal
 function displayYearEvents(year) {
   yearEvents.innerHTML = '';
  const eventForYear = eventsInYear.find(e => e.year === year.id);

  if(eventForYear) { 
      eventsInYear.map((list, i) => {
        if(year.id == list.year){
      
        const eventInYearDiv = document.createElement('div');
        eventInYearDiv.classList.add('list-on-year');
        eventInYearDiv.classList.add('draggable');
        eventInYearDiv.setAttribute ('draggable', 'true') ;
        eventInYearDiv.dataset.num =  list.id;
        eventInYearDiv.innerHTML = `<li>${list.title}</li>`;
    
         const deleteBtn = document.createElement('i');
         const finishBtn = document.createElement('i');
         deleteBtn.setAttribute('class', 'fas fa-trash-alt');
         finishBtn.setAttribute('class', 'fas fa-check' )
         eventInYearDiv.appendChild(deleteBtn);
         eventInYearDiv.appendChild(finishBtn);
        yearEvents.appendChild(eventInYearDiv);
    
         //if it's finishedlist, add class of finished-list
         if(finishedLists){
         finishedLists.map((finishedList, i)=>{
           if(list.id == finishedList.id){
            eventInYearDiv.classList.add('finished-list');
           }
         })
         };
        }
      })
  }
    
 }




// let birthday = flatpickr(".inputBDay", config1);  
// let expectedDay = flatpickr(".inputExpectedDay", config2);
  
// if it has been input, shows squares when it's reloded

let reloadFlag = false;
let birthday = flatpickr(".inputBDay", config1);  
let expectedDay = flatpickr(".inputExpectedDay", config2);

  document.addEventListener("DOMContentLoaded", ()=>{
    if(eday){
  config1.onChange();
  config2.onChange();
  reloadFlag = true;
    }
    
    console.log('reloaded', reloadFlag)
  });
    // document.addEventListener("DOMContentLoaded", ()=>{
    //  if(localStorage.getItem('eday')){
    //   // if(weekArray.length){

    //     // weekArray = [];
        

    //   // }
    //   config1.onChange();
    //   config2.onChange();
   
    //  }
    //  })
  
  
  // document.addEventListener('DOMContentLoaded', ()=>{
  //   if(bday){
  //     let lastInputBday = bday.pop().date;
  //     let lastInputEday = eday.pop().date;
  //     document.querySelector('.inputBDay').value = lastInputBday;
  //     document.querySelector('.inputExpectedDay').value = lastInputEday; 
    
  //     birthday.selectedDates[0] = lastInputBday;
  //      expectedDay.selectedDates[0] = lastInputEday;
    
  //     // birthday = flatpickr(".inputBDay", config1);
  //     // expectedDay = flatpickr(".inputExpectedDay", config2);
  //     config1.onChange( birthday.selectedDates[0]);

  //    console.log(birthday);
  //   }else {
  //     birthday = flatpickr(".inputBDay", config1);
       
  //   expectedDay = flatpickr(".inputExpectedDay", config2);
  //   }
  // });
  
    