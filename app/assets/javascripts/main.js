var pos = 0;/*esta variable va a almacenar la posicion de nuestro slider*/
var intv;/*almacenara el intervalo de tiempo del slider*/
var flippedElement;//FLIP-- va a contener el elemento q se haya girado para que sepamos cual debemos regresar
var opcionesHoteles = [{opciones:[{opcion:'Cuarto individual'},{opcion:'Alberca privada'}, //FLIP-- va a contener las opciones de cada paquete. arreglo con objetos json. este codigo esta relacionado con el script del index.tenemos el objeto opciones, que contiene un arreglo, dentro del arreglo opciones hay opcion
					 {opcion:'Jacuzzi con burbujas'}],costo: '350',paquete:'Paquete medio'},
					 {opciones:[{opcion:'Cuarto individual'},{opcion:'Alberca privada'},
					 {opcion:'Jacuzzi de plata'}],costo:'500',paquete:'paquete premium'},
					 {opciones:[{opcion:'Cuarto individual'},
					 {opcion:'Alberca privada'},{opcion:'Jacuzzi'}],costo:'300',paquete:'paquete económico'}]; 

					//PARA ENTENDER QUE OPCION PERTENECE A LOS DATA-NUMBER DE JAVASCRIPT DEL INDEX:
//var opcionesHoteles = ***DESDE AQUI LA OPCION 0[{opciones:[{opcion:'Cuarto individual'},{opcion:'Alberca privada'}, //FLIP-- va a contener las opciones de cada paquete. arreglo con objetos json. este codigo esta relacionado con el script del index.tenemos el objeto opciones, que contiene un arreglo, dentro del arreglo opciones hay opcion
//					 {opcion:'Jacuzzi con burbujas'}]}HASTA AQUI LA OPCION 0, ***DESDE AQUI LA OPCION 1{opciones:[{opcion:'Cuarto individual'},
//					 {opcion:'Alberca privada'},
//					 {opcion:'Jacuzzi de oro'}]}HASTA AQUI LA OPCION 1,***DESDE AQUI LA OPCION 2{opciones:[{opcion:'Cuarto individual'},
//					 {opcion:'Alberca privada'},{opcion:'Jacuzzi'}]}]; HASTA AQUI LA OPCION 2
//
$(document).on('ready',function(){ /*el primer requisito para poder trabajar un elemento del dom o la pag, es q haya sido cargado. el documento de la pagina q contiene todos los elementos, lanza un evento ready cuando la pag ha sido cargada por completo. ademas del ready, mandamos una funcion como parametro, esta contendra el codigo q va a ejecutarse una vez el evento suceda, que evento? ready*/
	init();
});

$(window).on('resize',init);/*RESPONSIVE.- */
window.addEventListener('orientationchange',init);/*RESPONSIVE.- cuando el usuario gire el dispositivo, se dispara la funcion init*/

function init(){ /*listener*/
	/*alert('se movio la pantalla');//RESPONSIVE.- para corroborar que esta cargando de nuevo el init cuando se cambia el tamaño de la pantalla*/
	if($('html').width() > 900){/*RESPONSIVE.- si el tamaño del dispositivo es 900, que desactive stellar*/
		$.stellar({
			'horizontalScrolling': false,
			hideDistantElements: false
		});
	}

	$.stellar({/*PARALLAX.- STELLAR, INICIALIZA STELLAR. documentacion donde podremos modificar STELLAR a nuestro gusto:
    http://markdalgleish.com/projects/stellar.js/docs/ */
		'horizontalScrolling':false,/*PARA QUE NO HAGA EFECTOS CON EL SROLL HORIZONTAL.para q solo considere el scroll vertical*/
		hideDistantElements: false/*Evita que se oculten los elementos(YA QUE CUANDO SALEN DEL VIEWPORTO (LA VISTA DEL USUARIO, STELLAR LO OCULTA)) a la hora de aplicar stellar a estos*/
		});


	var sc = $.scrollorama({blocks:'.fullScreen',enablePin:false});/*PARALLAX.- SCROLLORAMA- inicia la libreria, esto nos liberara un objeto q almacenaremos en sc. tambn recibe ciertos atributos que configuraran el mismo. blocks es muy importante porque eso le permite al plugin saber sobre que elementos van a ser relativos los calculos de distancia q va a ser, en este caso, la clase fullScreen */
	sc.animate('.mensajePrincipal',{delay:700,duration:350,property:'top',end:500});/*va a hacer el trabajo de animar las cosas, recibe dos parametros, uno el elemento sobre el q lo va a hacer, y el segundo con las configuraciones q va a tener la animacion d su elemento*/
	/*delay le dice a partir de que distancia del scroll va a empezar a hacer la animacion, en este caso 700px de scroll respecto al fullscreen, duration va a decir q tanto durara la animacion, 350px en este caso, property es cualquier propiedad CSS que sea calculable sobre la que lo va a hacer como left, right, margenes,etc, end y start nos permitira definir desde donde empezara la propiedad y donde terminara. para este caso, solo se hara uso del end*/
	sc.animate('.mensajePrincipal',{delay:700,duration:200,property:'opacity',end:0});
	sc.animate('.precio',{delay:400,duration:200,property:'zoom',start:0,end:1});/*ZOOM aunque el zoom no existe en css la libreria tiene un property zoom que escala elementos*/
	sc.animate('.centerCircle',{delay:300,duration:300,property:'opacity',start:0,end:1});/*con el start: 0 y el end: 1 hacemos que no se vea y despues empieze a aparecer*/
	sc.animate('.precio',{delay:400,duration:200,property:'zoom',start:0,end:1});
	sc.animate('.precio',{delay:400,duration:200,property:'zoom',start:0,end:1});
	/*sc.animate('#google_canvas',{delay:400,duration:200,property:'opacity',start:0,end:1});*/
	

	$('#navegacionPrincipal').localScroll();//PARALLAX.- LOCALSCROLL PARA LA NAVEGACION O MENU
	
	$('.slider_controls li').on('click',handleClick); /*cuando alguien haga click en el elemento li, dentro de slider_controls en el html, ejecute la funcion handleclick, de esta forma cargamos elementos que existen dentro de la pagina*/
	var width = $('.slider_container').width();

	$('.slide').each(function(i,e){/*SLIDER va iterando con cada uno de los elementos que coninciden con el selector, osea todos los que tengan la clase slider y nos permitira aplicarle ciertas modificaciones, y la funcion q se ejecuta cada vez eq itere uno de ellos, recibe dos parametros, primero el index y luego el elemento como tal */
			//se borro porque se repetiria codigo con el de la galeria, por lo tanto se creo el metodo addBackground
		//var url = $(e).data('background');/*parte del EFECTO PARALLAX guardamos la url que sera igual al elemento, referenciado a la variable e. JQUERY tiene un metodo llamado data que pasa como parametro, el nombre del atributo data, en este caso, backgraund*/
		//$(e).css('width',width+'px');
		//$(e).css('background-image',"url("+(url+".jpg")+")");/*PARTE DEL EFECTO PARALLAX establece el fondo de la imagen, primero colocamos la palabra reservada url, y luego la variable url que creamos en la linea de arriba, que contiene la informacion del data.jpg*/
		addBackground(e,width,true);//SLIDER se le coloca el primer parametro q en un metodo de recorrido each es "e", como segundo parametro el ancho q queremos asignarle, q en este caso lo tenemos en las lineas de arriba(linea 24 aprox) y el true para q si le haga un setSize
	});
	$('.image_food').on('click',changeViewPort);//GALERIA
	$('.image_food').each(function(i,e){//GALERIA
		addBackground(e,false);//SLIDER se le coloca el primer parametro el elemento, y el false para q no le haga un setSize
		if($(e).hasClass('viewport')) return true;//al view port no queremos cambiarle su posicion. gracias al metodo de jquery HAS CLASS que devuelve verdadero cuando el elemento contiene la clase que estamos pasando como parametro en este caso viewport, si es asi hacemos un return true y lo que va a hacer es q la funcion each pase al siguiente elemento. esta linea de codigo lo q hara sera ignorar al elemento que contenga la clase viewport para que no lo mueva de su lugar
		$(e).data('top',((i)*100));//en lugar de pedirle la informacion que hay en datatop estamos escribiendo un atributo data con el nombre top. explicacion: almacenamos de cuanto va a ser la distancia del top, y eso equivale a su posicion por cien. es decir, el primero tiene la posicion cero, cero por 100= 0 y lo mueve 0 pixeles, osea no lo mueve. el segundo tiene la posicion 1 por 100 = 100 y lo mueve 100px abajo y asi sustantivamente
		$(e).css({
			'top': $(e).data('top')+'px'//se toma el data top y se le agrega al top 
		});
	});
	//clearInterval(intv);/*limpia el intervalo en caso de que tuviese algo*/
	
	$(document).on('click','.ver-mas',flipElement);//FLIP--nuva forma de hacer la delegacion de listener o evento.el selector se hace sobre el documento, q este contiene los demas elementos. queremos apuntar a todos los elementos que contengan la clase ver mas. y la funcion q va a dispararse cuando suceda el click, va a ser flipElement. DE ESTA FORMA, EL ELEMENTO NO ESTA EN LA PAGINA CUANDO ESTA SE CARGA, SINO Q SE CARGA AL MOMENTO DE HACER CLICK

	intv = setInterval(handleClick,10000);//la funcion que ejecutara sera handleclick y el segundo son los milisegundos, en este caso, 10000 milisegundos son 10 segundos. la funcion handleclick se estara ejecutando cada 10000 milisegundos
}
					/*GOOGLE MAPS*/
	google.maps.event.addDomListener(window,'load',drawMap);
	function drawMap(){
		var mapa;
		var opcionesMapa = {
			zoom: 15,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		}
		mapa = new google.maps.Map(document.getElementById('google_canvas'),opcionesMapa);
	}
function changeViewPort(){//GALERIA
	var e = $('.viewport');//selecciona la imagen que esta en grande
	e.css('top',$(e).data('top'));//hace q esa imagen en grande se regresa a su lugar y eso significa extraer la posicion data que tiene en top que nosotros mismos guardamos en la variable 'top de arriba en la linea 39'
	e.removeClass('viewport');//le quita el viewport al elemento viejo o imagen. lo hara mas pequeño
	$(this).addClass('viewport');//le agrega el viewport al elemento nuevo o imagen
	$(this).css('top',0);//LE QUITAMOS EL ESPACIO EN TOP QUE PREVIAMENTE LE HABIAMOS PUESTO. le cambia la altura a la imagen a 0 para que se coloque arriba
}
function addBackground(element,width,setSize){//GALERIA Y SLIDER. se creo para evitar repetir codigo entre la galeria y el slider
	if (!width) width = $('html').width();//si no nos paso como parametro el width, entonces q esto lo coloque igual a html.width y esto nos dara el ancho de la pagina
	if(setSize){
		$(element).css({//element lo estamos recibiendo como parametro en el codigo q esta arriba y tiene que representar el elemento al q vamos a hacer las modificaciones, el css
			'width': width,
			'heigth': $('html').height()//igual al tamaño del html
		})
	}
	var imagen = $(element).data('background');
	if($('html').width() < 900) imagen = imagen+'-movil.jpg';/*RESPONSIVE.- si el tamaño del dispositivo es 900, que cambie las imagenes de fondo de pantalla a las de la version movil*/
	else imagen = imagen+'.jpg';
		/*alert(imagen);//para corroborar q tomaba las imagenes tanto moviles como normales*/
		$(element).css('background-image',"url("+(imagen)+")");
	if($(element).height() > $(element).width())	$(element).css('background-size',"auto 100%");/**/

}
function flipElement(){//FLIP
	//PARA Q SE VOLTEE EL ELEMENTO A SU ORIGEN EN CASO DE QUE SE VOLTEE OTRO
	if(flippedElement != null){//si alguna de nuestras cartas esta volteada, quiere decir q flippedelement no es nulo.NULO=NO TIENE VALOR O NO EXISTE
		$(flippedElement).revertFlip();// si es diferente de nulo, revertflip metodo de la libreria d jquery q regresa al estado original el elemento
		flippedElement = null;//para q el codigo entienda que ya no hay elementos volteados
	}
	$(flippedElement).remove();//para asegurarse y evitar bugs,y q el codigo entiena bien q no hay elementos de la condicional if. elimina un elemento del documento por completo
	var padre = $(this).parent();//FLIP-- el objeto que dispara el elemento es ver-mas, this es lo que contiene ver-mas, y el padre de this es precio. padre es lo q queremos dar la vuelta
	flippedElement = padre;//padre es lo que queremos dar la vuelta
	$('#precioTemplate').template("CompiledTemplate");//seleccionamos el template. y compilamos el template para las opciones q tiene, como el each y la impresion de la variable opcion
	$(padre).flip({
		direction: 'rl',//hacia donde va a rotar
		speed: 500,//velocidad con q se hace el giro, 500 milisegundos
		content: $('#precioTemplate').tmpl(opcionesHoteles[$(this).data('number')]).html(), //lo que mostrara. este template tiene un metodo tmpl que recibe como parametro un objto que es la informacion que pasamos al template. THIS ES EL OBJETO SOBRE EL Q DIMOS CICK, LO PONEMOS DENTRO DE CORCHETES PARA MANDARSELO COMO INDICE AL ARREGLO opcionesHoteles. y el metodo html es para q saque todo el contenido d html del template y lo coloque en el content. ejemplo con html solamentecontent: '<h1>Ejemplo</h1>', 
		color:'#f7f7f7',//el color q tendra el elemento al regresar
		onEnd: function(){//PARA Q SE VOLTEE EL ELEMENTO PULSANDO EL BOTON REGRESAR. ejecuta cierto codigo una vez q el elemento haya acabado de voltearse
			$('#regresar-ventana').on('click',function(){
				//alert('Click')
				$(flippedElement).revertFlip();// si es diferente de nulo, revertflip metodo de la libreria d jquery q regresa al estado original el elemento
				flippedElement = null;//para q el codigo entienda que ya no hay elementos volteados
			});
		}
	});
}

function handleClick(){/*la condicion, evaluara si se ejecuto la funcion handleclick se ejecuto por el boton o por un intervalo*/
	var slide_target = 0;/*indice que va recorriendo segun el click*/
	if($(this).parent().hasClass('slider_controls')){/*la palabra reservada this, es una variable que sera el elemento de los li,y .parent tiene q tener la clase slider_controls. si es verdadero es xq el evento se disparo por un click*/
		slide_target = $(this).index();/*cuando le demos click a cada uno de los botones, cada uno tiene un index, que el inicial es 0, este indice lo almacenamos en esta variable llamada slide_target*/
		/*alert(slide_target);*//*imprime el valor del indice de el li*/
		pos = slide_target;//se actualizara al hacer click, automaticamente cambiara de imagen desde la imagen que se hizo click, en vez de la ultima q movio automaticamente
		clearInterval(intv);//desactiva o elimina el intervalo para que se deje de ejecutar. esto lo hacemos porque puede que le falte un segundo para cambiar de imagen, cuando le damos click, damos el click, y automaticamente va a cambiar despues del segundo que faltaba
		intv = setInterval(handleClick,10000);//volvemos a crear el intervalo
	} 
	else{ //para que se ejecute por un intervalo de tiempo
		pos++;
		if(pos>=$('.slide').length){//PARA CONTROLAR QUE NO SE PASE DEL TAMAÑO DEL SLIDE. length devuelve la cantidad de elemento que tiene la clase slide. dice q una vez q sea mayor o igual a la cantidad de elementos lo reinicia a cero 0
			pos = 0;//lo reinicia a cero para q regrese al primer slider
		}
		slide_target = pos;//porque slide_target mueve nuestro slider
	}

	
	 $('.slideContainer').fadeOut('slow',function(){ /*target a la clase slideContainer del index. se le aplica el fadeOut que es una funcion jquery q va haciendo negro el elemento hasta que lo oculta, el primer parametro es la velocidad con la que lo hara, el segundo parametro es pasar una funcion cuando el primer parametro haya terminado*/
		$(this).animate({
			'margin-left':-(slide_target * $('.slider_container').width())+'px'/*animaremos el margin left, utilizaremos el indice que ya encontramos, y se multiplicara por el tamaño del slider_container */
		},'slow',function(){
			$(this).fadeIn();/*vuelve a mostrar el slider, despues de la ejecuciom*/
		});
	});
/**************************************OTRO EFECTO SUSTITUYENDO AL FADEOUT Y FADEIN****************************************************************/
	/*$('.slideContainer').animate({
			'margin-left':-(slide_target * $('.slider_container').width())+'px'},'slow');//OTRO EFECTO que desliza el slider desde la derecha*/
		
/******************************************OTRO EFECTO SUSTITUYENDO AL FADEOUT Y FADEIN********************************************/
		/*$('.slideContainer').slideUp('slow',function(){ //target a la clase slideContainer del index. se le aplica el fadeOut que es una funcion jquery q va haciendo negro el elemento hasta que lo oculta, el primer parametro es la velocidad con la que lo hara, el segundo parametro es pasar una funcion cuando el primer parametro haya terminado/
		$(this).animate({
			'margin-left':-(slide_target * $('.slider_container').width())+'px'//animaremos el margin left, utilizaremos el indice que ya encontramos, y se multiplicara por el tamaño del slider_container /
		},'slow',function(){
			$(this).slideDown();//vuelve a mostrar el slider, despues de la ejecuciom/
		});
	});*/ 
/************************************************************************************************************************/
}