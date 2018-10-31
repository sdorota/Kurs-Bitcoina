$(document).ready(function () {
    //definicja funkcji
    function getBitcoinVal() {

        var currentBuyPrice = parseFloat($('#buy').text());
        //    console.log(currentBuyPrice);

        var currentSellPrice = parseFloat($('#sell').text());
        //    console.log(currentSellPrice);

        //otwarcie połączenia i zebtanie danych w formie JSON
        $.getJSON('https://blockchain.info/pl/ticker', function (data) {

            //        console.log(data);
            //        kupno z obiektu
            //        console.log(data.PLN.buy);
            //        sprzedaz z obiektu
            //        console.log(data.PLN.sell);

            $('#buy').text(data.PLN.buy);
            $('#sell').text(data.PLN.sell);


            //        warunki spełnienia dla strzalek
            if (currentBuyPrice > data.PLN.buy) {
                //            jeżeli cena spadła
                $('#buy-arrow').removeAttr('class').addClass('fas fa-arrow-down').css('color', 'red');
            } else if (currentBuyPrice < data.PLN.buy) {
                //            jeżeli cena wzrosła
                $('#buy-arrow').removeAttr('class').addClass('fas fa-arrow-up').css('color', 'green');
            } else {
                //            jeżeli cena bez zmian
                $('#buy-arrow').removeAttr('class').addClass('fas fa-minus-square').css('color', 'blue');
            }

            if (currentSellPrice > data.PLN.sell) {
                //            jeżeli cena spadła
                $('#sell-arrow').removeAttr('class').addClass('fas fa-arrow-down').css('color', 'red');
            } else if (currentSellPrice < data.PLN.sell) {
                //            jeżeli cena wzrosła
                $('#sell-arrow').removeAttr('class').addClass('fas fa-arrow-up').css('color', 'green');
            } else {
                //            jeżeli cena bez zmian
                $('#sell-arrow').removeAttr('class').addClass('fas fa-minus-square').css('color', 'blue');
            }

            console.log('odswiezono');

        })

    }
    //wywołanie funkcji
    getBitcoinVal();

    // wywołanie funkcji z ustawionym interwałem
    var interval = setInterval(getBitcoinVal, 5000);

    //definicja funkcji, która po przyciśnięciu w button, czyści interwał i ustawia nowy interwal
    function changeInterval() {
        $('.control-button').click(function () {
            clearInterval(interval);
            interval = setInterval(getBitcoinVal, $(this).val());
            $('#refresh-frequency').html($(this).text());
        })
    }

    changeInterval();

})



