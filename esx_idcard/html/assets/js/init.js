$(document).ready(function(){
  // LUA listener
  window.addEventListener('message', function( event ) {
    if (event.data.action == 'open') {
      var tx          = event.data.array['prop'];
      var id          = event.data.array['id'];
      var type        = event.data.type;
      var userData    = event.data.array['user'][0];
      var licenseData = event.data.array['licenses'];
      var sex         = userData.sex;
      var sexc        = '';

      if ( sex.toLowerCase() == 'm' ) {
        sexc = 'mand';
      } else {
        sexc = 'kvinde';
      }

      if ( type == 'driver') {
        $('#l1').show();
        $('#l2').hide();
        $('#l3').hide()
        
        if ( sexc == 'mand' ) {
          $('img').attr('src', 'assets/images/male.png');
          $('#sex').text(sexc);
        } else {
          $('img').attr('src', 'assets/images/female.png');
          $('#sex').text(sexc);
        }
        $('#lastname').text(userData.lastname);
        $('#firstname').text(userData.firstname);
        $('#dob').text(userData.dateofbirth);
        $('#popo').text('FoxRP POLITI');
        $('#height').text(userData.height);
        $('#signature').text(userData.firstname + ' ' + userData.lastname);

        if ( type == 'driver' ) {
          if ( licenseData != null ) {
          Object.keys(licenseData).forEach(function(key) {
            var type = licenseData[key].type;
            if ( type == 'drive_bike') {
              type = 'motorcykel';
            } else if ( type == 'drive_truck' ) {
              type = 'lastbil';
            } else if ( type == 'drive' ) {
              type = 'bil';
            }
            if ( type == 'motorcykel' || type == 'lastbil' || type == 'bil' ) {
              $('#licenses').text(type + ' /')
            }
          });
        }
          $('#id-card').css('background', 'url(assets/images/license.png)');
        }
      } else if ( type != 'driver' && type != 'weapon') {
        $('#l1').hide();
        $('#l2').show();
        $('#l3').hide();
        var cprend = "0000" + id
        var cpr = userData.dateofbirth.split("/").join("") + "-" + cprend.slice(-4)
        $('#cpr').text(cpr);
        $('#name2').text(userData.firstname + ' ' + userData.lastname);
        $('#sex2').text(sexc);
        $('#height2').text("Højde: " + userData.height);

        var popo2 = ""
        if(tx == 0) {
          popo2 = "FoxRP Region Hospital"
        } else {
          popo2 = event.data.array['name'][0]['name'] + " - FoxRP Region Hospital"
        }
        $('#popo2').text(popo2);

        $('#id-card').css('background', 'url(assets/images/idcard.png)');
      } else if ( type == 'weapon' ) {
        $('#l1').hide();
        $('#l2').hide();
        $('#l3').show();


        //$('#id-card').css('background', 'url(assets/images/firearm.png)');
      }

      $('#id-card').show();
    } else if (event.data.action == 'close') {
      $('#id-card').hide();
    }
  });
});
