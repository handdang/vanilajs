window.onload = () => {

    const delEl = document.getElementsByClassName('delete');
    let totalCnt = '';

    for (let i = 0 ; i < delEl.length; i++) {
        delEl[i].addEventListener('click' , handleClickDelete) 
    }

    function handleClickDelete(){
        const list = this.parentNode;
        list.remove();
        cnt();
        handleClickCheck();
    }
    
    function cnt(){
        const nodeList = document.querySelectorAll('li.list');
        totalCnt = nodeList.length;
        document.querySelector('.listsum').textContent = totalCnt;

        if(totalCnt <= 0){
            console.log(1);
            console.log(document.getElementsByClassName('none-list-container'))
            let tes = document.getElementById('none-list-container');
            tes.style.display = 'block';
        }
    }

    cnt();

    const checkBox = document.getElementsByClassName('check');
    for (let i = 0 ; i < checkBox.length; i++) {
        checkBox[i].addEventListener('click' , handleClickCheck) 
    }
    function handleClickCheck(){
        const query = 'input[name="resolve"]:checked';
        const selectedElements = document.querySelectorAll(query);
        
        // 선택된 목록의 갯수 세기
        const selectedElementsCnt = selectedElements.length;
        document.querySelector('.complete').textContent = selectedElementsCnt;
        document.querySelector('.noncomplete').textContent = totalCnt-selectedElementsCnt;
        let result = selectedElementsCnt / totalCnt * 100;
        if(totalCnt === 0) result = 0;
        document.querySelector('.goal-percent').textContent = result+'%';

    }
    handleClickCheck();
    
}
    