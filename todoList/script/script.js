"use strict";
window.onload = () => {

    const delEl = document.getElementsByClassName('delete');
    const checkBox = document.getElementsByClassName('check');
    const nodeList = document.querySelectorAll('li.list');
    const prev = document.querySelectorAll('.prev');
    const next = document.querySelectorAll('.next');
    console.log(prev);
    let index = 0;
    let totalCnt = '';
    let httpRequest;

    
    function handleClickDelete(){
        const plan_title = this.getAttribute('data-title');
        const list = this.parentNode;
        const delChk = confirm(plan_title+"일정을 삭제 하시겠습니까?");
        if(delChk){
            alert("일정이 삭제되었습니다.");
            list.remove();
            cnt();
            handleClickCheck();
        }else{
            return true;
        }
    }
    
    function makeRequest(index) {
        console.log(index);
        // if(!index) index = 0;
        httpRequest = new XMLHttpRequest();
        if(!httpRequest) {
            return false;
        }
        httpRequest.onreadystatechange = alertContents;
        httpRequest.open('GET', './script/data.json');
        httpRequest.send(null);
    }

    function alertContents() {
        // alert(index);
        console.log('alertContents:'+index)
        if(!index) index = 0;
        let html = '';
        console.log(httpRequest);
        console.log(XMLHttpRequest);
        console.log(httpRequest.readyState);
        console.log(XMLHttpRequest.DONE);
        if (httpRequest.readyState === XMLHttpRequest.DONE) {
            console.log('gg');
            if (httpRequest.status === 200) {
                const res = JSON.parse(httpRequest.response);
                const listArray = [];
                let doneCnt = 0;
                listArray.push(...res[index]);
                // listArray = res[index];
                console.log(listArray);
                totalCnt = listArray.length;
                if(totalCnt >= 0){
                    doneCnt = 0;
                    listArray.forEach((item)=>{
                        console.log(item);
                        doneCnt = doneCnt;
                        console.log(item)
                        html+='<li class="list">';
                        html+='<div class="check">';
                        html+='<label></label>';
                        html+= item.done_yn === 'Y' ? '<input type="checkbox" name="resolve" checked>' : '<input type="checkbox" name="resolve">';
                        html+='</div>';
                        html+='<div class="info">';
                        html+='<b>'+item.title+'</b>';
                        html+='<p>'+item.content+'</p>';
                        html+='</div>';
                        html+='<button class="delete" data-title="'+item.title+'"></button>';
                        html+='</li>';  
                    })

                    console.log(doneCnt);
                    handleClickCheck();
                    document.querySelector('.list-container').innerHTML = html;
                    
                    for (let i = 0 ; i < nodeList.length; i++) {
                        checkBox[i].addEventListener('click' , handleClickCheck) 
                        delEl[i].addEventListener('click' , handleClickDelete) 
                    }
                }else{
                    let tes = document.getElementById('none-list-container');
                    tes.style.display = 'block';
                }   
                document.querySelector('.listsum').textContent = totalCnt;
            } else {
                alert('request에 뭔가 문제가 있어요.');
            }
        }else{
            console.log('aa');
        }
    }
    makeRequest(index);

    function handleClickCheck(){
        const query = 'input[name="resolve"]:checked';
        const selectedElements = document.querySelectorAll(query);
        const selectedElementsCnt = selectedElements.length;
        document.querySelector('.complete').textContent = selectedElementsCnt;
        console.log(selectedElementsCnt);
        document.querySelector('.noncomplete').textContent = totalCnt-selectedElementsCnt;
        let result = selectedElementsCnt / totalCnt * 100;
        if(totalCnt === 0) result = 0;
        document.querySelector('.goal-percent').textContent = result+'%';
    }

    prev[0].addEventListener('click',function(){
        index = index + 1;
        makeRequest();
    });
    next[0].addEventListener('click',function(){
        index = index - 1;
        makeRequest();
    });
}
    