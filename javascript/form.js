//  File: form.js
//  Assignment: Multiplication table using javascript
//  File description: This is javascript file which performs the clacs and uses jquery plugins 
//  to show all the validations and also to get sliders and get tabs for the tables.
//  Arth Patel, UMass Lowell Computer Science, Arth_patel@student.uml.edu
//  Copyright (c) 2022 by Arth Patel. All rights reserved. May be
//  freely copied or excerpted for educational purposes with credit to the
//  author.
//  Updated by Arth Patel on June 23, 2022 at 3:00 PM

$(document).ready(function(){
    //validation of the form, shows errors when feild is wrong filled or any other errors
    $("#Form").submit(function(e){
        e.preventDefault();
    }).validate({
        rules:{
            digit1:{
                required: true,
                number:true,
                range: [-50, 50]
                
            },
            digit2:{
                required: true,
                number:true,
                range: [-50, 50]
            },
            digit3:{
                required: true,
                number:true,
                range: [-50, 50]
            },
            digit4:{
                required: true,
                number:true,
                range: [-50, 50]
            },
        },
        
        messages:{
            digit1:{
                required: "Please fill out this field",
                range:"Please enter a number between -50 to 50",
                
            },
            digit2:{
                required: "Please fill out this field",
                range:"Please enter a number between -50 to 50",
                
            },
            digit3:{
                required: "Please fill out this field",
                range:"Please enter a number between -50 to 50",
                
            } ,
            digit4:{
                required: "Please fill out this field",
                range:"Please enter a number between -50 to 50",
                
            }
        }


    });

    //This will prevent from table to be generated until the values are entered
    let digit1Bool = false;
    let digit2Bool = false;
    let digit3Bool = false;
    let digit4Bool = false;

    $("#tabContainer").tabs();

    //make a new tab
    $("#save_table").on("click", function(e){

        let digit1 = $("#digit1").val();
        let digit2 = $("#digit2").val();
        let digit3 = $("#digit3").val();
        let digit4 = $("#digit4").val();
    
    const tableHeader = `[${digit1},${digit2}]x[${digit3},${digit4}]`

      // This will check for validation and create a new table
      if (validator(digit1, digit2, digit3, digit4) != 0){
            $("#tabList").append(makeTab(tableHeader));
            const tabTableContainer = $("#tabData");
            const currentTable = document.querySelector("#tableContainer table").outerHTML;
      
            // tabTableContainer.append(makeTabContent(tableHeader, newCurrentTable));
            tabTableContainer.append(
              `<div id='${tableHeader}'>
                  <div class='overflow'>${currentTable}</div>
                </div>`
            );
          }
          $("#tabContainer").tabs("refresh");
          e.preventDefault()
        })
        
        // delete selected tab (got it from jquery website)
        const tabs = $("#tabContainer").tabs();
        tabs.on("click", "span.ui-icon-close", function () {
        dltSingleTab(this) 
        tabs.tabs("refresh");
         });

        // Deletes all selected tabs.
        $(".deletebutton").on("click", function () {
        deleteSelectedTabs()
        $("#tabContainer").tabs("refresh");
        });
});

//this holds the display table
let tableContainer = document.getElementById("tableContainer");

//this will make the table
function makeTable() {
  // getting values from the html file
  var digit1 = document.getElementById('digit1').value;
  var digit2 = document.getElementById('digit2').value;
  var digit3 = document.getElementById('digit3').value;
  var digit4 = document.getElementById('digit4').value;

  deleteTable(tableContainer);
  tableGen(digit1, digit2, digit3, digit4)
};

//this generates  the table
function tableGen(digit1, digit2, digit3, digit4) {
    // make a new table
    const newTable = document.createElement("table");

    // check if input values are correct
    if (validator(digit1, digit2, digit3, digit4) != 0) {
      let x, y;
      let table = "";
  
      // Create table
      for (y = digit3 - 1; y <= digit4; y++) {
        table += "<tr>";
        if (y == digit3 - 1) {
          table += "<th></th>";
          for (x = digit1; x <= digit2; x++) {
            table += "<th>" + x + "</th>";
          }
        } else {
          table += "<td>" + y + "</td>";
          for (x = digit1; x <= digit2; x++) {
            table += "<td>" + x * y + "</td>";
          }
        }
        table += "</tr>";
      }
      // Insert table
      newTable.innerHTML = table;
      tableContainer.append(newTable)
    }
  }

//this is a validation function, that checks for empty field and if the number is higher or lower
function validator(digit1, digit2, digit3, digit4){
    if (digit1 == "" || digit2 == "" || digit3 == "" || digit4 == "")
        return 0;
    if (digit1 < -50 || digit2 > 50 || digit3 < -50 || digit4 > 50)
        return 0;
    else 
        return 1;
}

//this will help create new table everytime new things are changed
function deleteTable(table){
    while(table.firstChild){
        table.removeChild(table.firstChild)
    }
}

//two way binding of the user input and the slider
$('#digit1_slider').on('input', function(){
    document.getElementById('digit1').value = document.getElementById('digit1_slider').value;
    document.getElementById('digit1_slider').value = document.getElementById('digit1').value;
    makeTable();
})
$('#digit2_slider').on('input', function(){
    document.getElementById('digit2').value = document.getElementById('digit2_slider').value;
    makeTable();
})
$('#digit3_slider').on('input', function(){
    document.getElementById('digit3').value = document.getElementById('digit3_slider').value;
    makeTable();
})
$('#digit4_slider').on('input', function(){
    document.getElementById('digit4').value = document.getElementById('digit4_slider').value;
    makeTable();
})

//this makes the tab 
function makeTab(tableHeader) {

    const newLI = document.createElement("li")
    const newLink = document.createElement("a")
    const newSpan = document.createElement("span")
    const newInput = document.createElement("input")
    const br = document.createElement("br")
  
    newLink.className += "tab"
    newLink.href = `#${tableHeader}`
    newLink.textContent = tableHeader
  
    newSpan.className += "ui-icon-close"
    newSpan.textContent = "x"
    newInput.type = "checkbox";
    newInput.className += "checkBox"
  
    newLI.append(newLink)
    newLI.append(newSpan)
    newLI.append(br)
    newLI.append(newInput)
    return newLI;
  }

//this function helps delete the single tab
function dltSingleTab(btn) {
    // gets the text of the link to get the id
    let tableID = btn.closest("li").querySelector("a").text;
    // gets the table id thru link
    let checkedTable = document.getElementById(`${tableID}`)
    // gets a child element to remove the parent
    const child = checkedTable.querySelector(".overflow")
    // remove the checked box element
    btn.parentElement.remove()
    // remove the element with same id
    child.parentElement.remove()
}

//this function deletes all the selected table
function deleteSelectedTabs() {
  // delete multiple tabs element
  // when clicked, find all elements with checkBox class
  const checkBox = document.querySelectorAll(".checkBox");
  checkBox.forEach(checkBoxChecked => {
    // the `href` has the id to the element needed
    let tableID = checkBoxChecked.closest("li").querySelector("a").text;
    // this selects the div i want to remove, the id of the div was taken from the href
    const checkedTable = document.getElementById(`${tableID}`)
    // just some random child element
    const child = checkedTable.querySelector(".overflow")

    if (checkBoxChecked.checked == true) {
      // remove the checked box element
      checkBoxChecked.parentElement.remove()
      // remove the element with same id
      child.parentElement.remove()
    }
  });
}