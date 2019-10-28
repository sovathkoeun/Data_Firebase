
$(document).ready(function() {
    db.collection('post').get().then( (snapshot) => {
        var result = "";
        snapshot.forEach(el => {
// we use for create image or 
            result +=`
                <div class="card shadow-lg mt-4">
                    <div class="card-header">
                        <img src="${el.data().profile_image}" style="border-radius:50%" width="50" height="50">
                        ${el.data().name}
                        <button class="btn btn-danger float-right" onclick="deletepicture('${el.id}')" type="button">Delete </button>
                    </div>
                    <div class="card-body">
                        <img src="${el.data().post_image}" class="img-fluid">
                        <div class="card-footer">
                            <button type="button" class="btn btn-primary float-right" data-toggle="modal" data-target="#myModal${el.id}">View</button>
                        </div>
                    </div>
                    
                  <div class="modal" id="myModal${el.id}">
                    <div class="modal-dialog">
                      <div class="modal-content">
                        <div class="modal-header">
                        <img src="${el.data().profile_image}" style="border-radius:50%" width="50" height="50"> &nbsp;
                       ${el.data().name}
                          <button type="button" class="close" data-dismiss="modal">&times;</button>
                        </div>
    
                        <div class="modal-body">
                        <img src="${el.data().post_image}" class="img-fluid">
                        </div>
                        
                        <!-- Modal footer -->
                        <div class="modal-footer">
                          <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
            `;
        });
        $('#result').append(result);
    });

    // we use for call id from endex.html or calling create virable 
    $('button').on('click', function(){
        var name    = $('#name').val();
        var profile = $('#profile').val();
        var post    = $('#post').val();

        db.collection('post').add({
            name : name,
            profile_image : profile,
            post_image: post,
        });
    });
});
// we use for call function from deletepicture{el.id}
function deletepicture(pId){
    db.collection('post').doc(pId).delete();
}