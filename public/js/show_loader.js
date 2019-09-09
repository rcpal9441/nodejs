var View = function ($e) {
    this.selector = $e;
    this.width = 0;
    this.top =0;
  	this.left =0;
    this.display = function () {
		var off = this.selector.offset();
		this.width =this.selector.width();
		this.top = off.top + 5 +'px';
		this.left = off.left + this.width+30+'px';
      this.selector.after('<span id="show-loader" style="position:absolute;top:'+this.top+';left:'+this.left+'"><img src="http://dbr.ztracker.in/img/712.GIF"/></span>');
      
	}
};
$.fn.loader = function (data) {
    var view = new View($(this));
    if(data == 'show')
    view.display();
    else
    $('#show-loader').remove();
}