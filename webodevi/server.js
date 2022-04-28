
'use strict';
const express = require('express');
const app = express();

var users = [
    {
        username: 'burak', password: '123',
        gorevler:
            [
                {
                    //default gorev ekle yy.aa.gg
                    id: 1,
                    gorevAdi: 'Gereksinim',
                    gorevKategorisi: 'TEST',
                    gorevAciklamasi: 'Gereksinimleri test et',
                    gorevBaslangicTarihi: '2021-01-18',
                    gorevBitisTarihi: '2021-02-13',
                    gorevDurumu: 'DEVAM EDIYOR'
                },
                {
                    //default gorev ekle yy.aa.gg
                    id: 2,
                    gorevAdi: 'Scrum yapalim',
                    gorevKategorisi: 'ANALIZ',
                    gorevAciklamasi: 'Scrum kurallarýna kesinlikle uy !',
                    gorevBaslangicTarihi: '2021-01-11',
                    gorevBitisTarihi: '2021-01-24',
                    gorevDurumu: 'BITTI' 
                        
                      
                },

                {
                    //default gorev ekle yy.aa.gg
                id: 3,
                gorevAdi: 'Coding',
                gorevKategorisi: 'KODLAMA',
                gorevAciklamasi: 'Hatalarý debug ederek düzelt',
                gorevBaslangicTarihi: '2021-01-29',
                gorevBitisTarihi: '2021-02-05',
                    gorevDurumu: 'TAMAMLANMADI' 
                  
                   
                },
                {
                //default gorev ekle yy.aa.gg
                id: 4,
                gorevAdi: 'Database',
                gorevKategorisi: 'TASARIM',
                gorevAciklamasi: 'Veritabani Semasini ciz',
                gorevBaslangicTarihi: '2021-01-25',
                gorevBitisTarihi: '2021-02-07',
                    gorevDurumu: 'DEVAM EDIYOR' 
                   
                    
                },




            ]
    },
    {
        username: 'minel', password: '123', gorevler:
            [

                {
                    id: 6,
                    gorevAdi: 'Test',
                    gorevKategorisi: 'TEST',
                    gorevAciklamasi: 'Kodu test et !',
                    gorevBaslangicTarihi: '2021-01-21',
                    gorevBitisTarihi: '2021-02-14',
                    gorevDurumu: 'DEVAM EDIYOR'
                },
                {
                    id: 7,
                    gorevAdi: 'ANALIZ',
                    gorevKategorisi: 'Kodu analiz et !',
                    gorevAciklamasi: '',
                    gorevBaslangicTarihi: '2021-01-15',
                    gorevBitisTarihi: '2021-01-24',
                    gorevDurumu: 'BITTI'
                        
                },
                {
                    id: 8,
                    gorevAdi: 'Sema',
                    gorevKategorisi: 'TASARIM',
                    gorevAciklamasi: 'Veritabani semasi',
                    gorevBaslangicTarihi: '2021-01-29',
                    gorevBitisTarihi: '2021-02-07',
                    gorevDurumu: 'TAMAMLANMADI'
                }
            ]
    }
]
var obj;

app.set('view engine', 'ejs');
app.set('views', './gorunum');

app.use(express.urlencoded({
    extended: true
}));
app.use(express.static(__dirname + '/public'));
app.get('/', function (req, res) {
    res.redirect("/giris.htm");
});
app.get('/giris.htm', function (req, res) {
    res.sendFile(__dirname + "/" +
        "giris.htm");
});

app.get('/gorev.htm', function (req, res) {
    res.sendFile(__dirname + "/" +
        "gorev.htm");
});

app.post('/process1_post', function (req, res) {
    console.log(obj.KullaniciAdi + " " + obj.Parola);
    users.forEach((user) => {
        console.log(user.username + " " + user.password);
        if (user.username == obj.KullaniciAdi && user.password == obj.Parola) {
            var response1 = {
                id: req.body.gorevId,
                gorevAdi: req.body.gorevAd,
                gorevKategorisi: req.body.gorevKategori,
                gorevAciklamasi: req.body.gorevAciklamasi,
                gorevBaslangicTarihi: req.body.basTarih,
                gorevBitisTarihi: req.body.sonTarih,
                gorevDurumu: req.body.gorevDurumu
            };
            console.log(response1);
            user.gorevler[user.gorevler.length + 1] = response1;
            user.gorevler.sort(function (a, b) {
                var tarih1 = new Date(a.gorevBaslangicTarihi), tarih2 = new Date(b.gorevBaslangicTarihi)
                return tarih1 - tarih2
            });

            user.gorevler.forEach((gorev) => {
                var gorevTarihi = new Date(gorev.gorevBitisTarihi);
                var simdikiTarih = new Date();
                if ((gorevTarihi < simdikiTarih) && gorev.gorevDurumu == 'DEVAM EDIYOR') {
                    gorev.gorevDurumu = 'TAMAMLANMADI';
                }
            })

            res.render('index', {
                Gorev: user.gorevler
            });
        }

    })
})

app.post('/process_post', function (req, res) {

    var response = {
        KullaniciAdi: req.body.KullaniciAdi,
        Parola: req.body.Parola
    }
    obj = JSON.parse(JSON.stringify(response));


    users.forEach((user) => {
        console.log(user.username + " " + user.password);
        if (user.username == obj.KullaniciAdi && user.password == obj.Parola) {

            user.gorevler.forEach((gorev) => {
                var gorevTarihi = new Date(gorev.gorevBitisTarihi);
                var simdikiTarih = new Date();
                if ((gorevTarihi < simdikiTarih) && gorev.gorevDurumu == 'DEVAM EDIYOR') {
                    gorev.gorevDurumu = 'TAMAMLANMADI';
                }
            })

            user.gorevler.sort(function (a, b) {
                var tarih1 = new Date(a.gorevBaslangicTarihi), tarih2 = new Date(b.gorevBaslangicTarihi)
                return tarih1 - tarih2
            });

            res.render('index', {
                Gorev: user.gorevler
            });
        }

    })

})


var server = app.listen(8080, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("Dinlemede http://%s:%s", host, port)
})

module.exports.obj = obj;
module.exports.users = users;
