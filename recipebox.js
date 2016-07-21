var finOb = [];

class Recepies extends React.Component{
  constructor(){
    super();
    
    if(localStorage.getItem("_mrnemeth_recipes") == null || localStorage.getItem("_mrnemeth_recipes").length === 2){
      var store = JSON.stringify([{title:"Pasta",ingredients:["Tomatoe"," Basil"," Garlic"," Pasta"]},{title:"Stew",ingredients:["Chicken","Paprika"," Water","Salt and Pepper"]},{title:"Pizza",ingredients:["Flour","Ham","Tomato","Basil","Mozzarella"]}])
      localStorage.setItem("_mrnemeth_recipes", store);
      this.starters = localStorage.getItem("_mrnemeth_recipes");
    }else{
      this.starters = localStorage.getItem("_mrnemeth_recipes");
    }
    finOb = JSON.parse(this.starters);
    var num = 0;
    function deletebutton(){
      var n = this.replace(/\D/g, '');
      var pan = "panel-"+n;
      document.getElementById(pan).outerHTML='';
      finOb.splice((n-1), 1);
      localStorage.setItem("_mrnemeth_recipes", JSON.stringify(finOb));
  }
    function saveedit(){
      var n = this.replace(/\D/g, '');
      var recipe = document.getElementById("recipe"+n).value;
  var ingredients = document.getElementById("ingredients"+n).value;
  ingredients = ingredients.replace(/^\s+|\s+$|\s+(?=\s)/g, "");
  var ings = ingredients.split(",");
      finOb[n-1].title = recipe;
      finOb[n-1].ingredients = ings;
      localStorage.setItem("_mrnemeth_recipes", JSON.stringify(finOb));
    }
    this.mapping = finOb.map(function(name){
     num++;
      var coll = "collapse"+num;
      var hrefcoll = "#collapse"+num;
      var head = "heading"+num;
      var del = "delete-"+num;
      var pan = "panel-"+num;
      var mymodal = "myModalEdit"+num;
      var mymodaldata = "#myModalEdit"+num;
      var recipeID = "recipe"+num;
      var ingredID = "ingredients"+num;
      var submit = "sub"+num;
          return    <div id={pan} className="panel panel-default">
                     <div className="panel-heading" role="tab" id={head}>
                       <h3 className="panel-title">
                         <a role="button" data-toggle="collapse" data-parent="#accordion" href={hrefcoll} 
          aria-controls={coll}>
          {name.title}
        </a>
      </h3>
    </div>
    <div id={coll} className="panel-collapse collapse" role="tabpanel" aria-labelledby={head}>
      <h4>Ingredients</h4>
      <ul className="list-group">
         {name["ingredients"].map(function(line){
                                          return  <li className="list-group-item">{line}</li>
                                        })}
                                      </ul>
      <button id={del} onClick={deletebutton.bind(del)} className="btn btn-danger">Delete</button>
      <button type="button" className="btn btn-default" data-toggle="modal" data-target={mymodaldata}>Edit</button>
      
      <div className="modal fade" id={mymodal} tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
  <div className="modal-dialog" role="document">
    <div className="modal-content">
      <div className="modal-header">
        <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 className="modal-title" id="myModalLabel">Edit Recipe</h4>
      </div>
      <div className="modal-body">
        <form  role="form">
  <div className="form-group">
    <label for="text">Recipe</label>
    <input id={recipeID} type="text" defaultValue={name.title} className="form-control" />
      </div>
  <div className="form-group">
    <label for="text">Ingredients</label>
    <input type="text" defaultValue={name["ingredients"]} className="form-control" id={ingredID}/>
  </div>
  <button id={submit} type="submit" onClick={saveedit.bind(submit)} className="btn btn-primary">Edit Recipe</button>
        <button  type="button" className="btn btn-default" data-dismiss="modal">Close</button>   
</form>
      </div>
    </div>
  </div>
</div>
      
    </div>
  </div>          
   });
  }
  save(){
  var recipe = document.getElementById("recipe").value;
  var ingredients = document.getElementById("ingredients").value;
  ingredients = ingredients.replace(/^\s+|\s+$|\s+(?=\s)/g, "");
  var ings = ingredients.split(",");
  finOb.push(recipinator(recipe,ings));
  
  localStorage.setItem("_mrnemeth_recipes", JSON.stringify(finOb));
  
  //function to create the receipe object
  function recipinator(recname, ingreds){
    var toPush = {title:recname,ingredients:ingreds};
    return toPush;
  }
  }
  render(){
    return (
    <div>
        <div id="book" className="recipebox">
          <h2>Recipe Box</h2>
    <div className="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
        {this.mapping}
      </div>
        </div>
        <div className="menu">
<button type="button" className="btn btn-primary" data-toggle="modal" data-target="#myModal">
  Add Recipe
</button>
<div className="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
  <div className="modal-dialog" role="document">
    <div className="modal-content">
      <div className="modal-header">
        <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 className="modal-title" id="myModalLabel">Add a Recipe</h4>
      </div>
      <div className="modal-body">
        <form  role="form">
  <div className="form-group">
    <label for="text">Recipe</label>
    <input id="recipe" type="text" placeholder="Recipe Name" className="form-control" />
      </div>
  <div className="form-group">
    <label for="text">Ingredients</label>
    <input type="text" placeholder="Enter Ingredients,Separated,By Commas" className="form-control" id="ingredients"/>
  </div>
  <button id="sub" type="submit" onClick={this.save} className="btn btn-primary">Add Recipe</button>
        <button  type="button" className="btn btn-default" data-dismiss="modal">Close</button>   
</form>
      </div>
    </div>
  </div>
</div>
    </div>
        </div>
    );
  }
}

ReactDOM.render(
  <Recepies />,
  document.getElementById('reccc')
);
  
