let submit_btn = document.querySelector("#submitBtn");
let input_amount = document.querySelector("#amount");
let input_return = document.querySelector("#return");
let input_time_period = document.querySelector("#time_period");
let display_amount = document.querySelector("#amount_invested");
let display_return_amount = document.querySelector("#intrest");
let display_total_amount = document.querySelector("#total");
let invest_type =  document.querySelector("#investment_type");
let left_graph_color = document.querySelector(".amt_invested");
let right_graph_color = document.querySelector(".return_recieved");


function updateCheckedRadio() {
    const checkedRadio = document.querySelector('.radio_btn input[name="radioBtn"]:checked');

    if (checkedRadio.id == "SIP") {
        // alert("checked ID is SIP");
        invest_type.textContent="Monthly Investment : ";
        SIP_Calculator();
    } 
    else if(checkedRadio.id == "Lumpsump") {
        // alert("checked ID is LUMPSUMP");
        invest_type.textContent="Total Investment : ";
        Lumpsump_Calculator();
    }
    else{
        return;
    }
}

document.querySelectorAll('.radio_btn input[name="radioBtn"]').forEach(radio => {
    radio.addEventListener('change', updateCheckedRadio);
});

submit_btn.addEventListener("click",()=>{
    updateCheckedRadio();

    if(input_amount.value =="" || input_return.value == "" || input_time_period.value == ""){
        return;
    }
    else{
        document.querySelector(".right").style.opacity = 1;
        document.querySelector(".main").style.width = "90%";
    }
})


function SIP_Calculator(){

    let Amt = parseFloat(input_amount.value);
    let rate = parseFloat((input_return.value)/12/100);
    let time = parseFloat(input_time_period.value);
    let time_in_months = time*12;

    let total = parseFloat(Amt * (((1+rate)**time_in_months-1)/rate) * (1+rate));
    let interest = total - (Amt*time_in_months);

    if(isNaN(Amt) || isNaN(rate) || isNaN(time))
    {
        return;
    }
    else{
        display_amount.innerHTML = "₹ " + (Amt*time_in_months).toFixed(2);
        display_return_amount.innerHTML = "₹ " + interest.toFixed(2);
        display_total_amount.innerHTML = "₹ " + total.toFixed(2);
    }

    let left = ((Amt*time_in_months)*100)/total;
    let right = (interest*100)/total;

    left_graph_color.style.width = left + "%";
    right_graph_color.style.width = right + "%";

}

function Lumpsump_Calculator(){

    let Amt = parseFloat(input_amount.value);
    let rate = parseFloat(input_return.value);
    let time = parseFloat(input_time_period.value);

    if(isNaN(Amt) || isNaN(rate) || isNaN(time))
    {
        return;
    }
    else{
        let interest = Amt * (rate / 100) * time;
        let total = Amt + interest;

        display_amount.innerHTML = "₹ " + Amt.toFixed(2);
        display_return_amount.innerHTML = "₹ " + interest.toFixed(2);
        display_total_amount.innerHTML = "₹ " + total.toFixed(2);
    
        let left = (Amt*100)/total;
        let right = (interest*100)/total;

        left_graph_color.style.width = left + "%";
        right_graph_color.style.width = right + "%";

    }

}

