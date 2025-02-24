"use strict";

	var sendBtn = document.getElementById( 'sendBtn' );
	var myForm = document.getElementById( 'myForm' );
	var errormsg;
	
	sendBtn.addEventListener( 'click', function( event ) {

		var nom = document.querySelector( '[name=\'user-name\']' ) || document.getElementById( 'nom' );
		var email = document.querySelector( '[name=\'user-email\']' ) || document.getElementById( 'email' );
		
		var successmessage = document.getElementById( 'msg-ok');
		
		var arrayInput = [nom, email];
		deleteErrors();

		if( !nom.value || !isEmail( email.value) ){
			var msg = 'This field is mandatory';
			if( !nom.value ){
				
				errors( nom, 'required-name', msg );
				
			}else if( nom.value ){
				var node = document.getElementById('required-name');
				if( node ) {
					node.parentNode.removeChild( node );
					errormsg = '';
				}
			}
			if( !isEmail( email.value) ){
				
				if( !errormsg ) errormsg = email;
				var node = document.getElementById('required-email');
				if( node ) {
					node.parentNode.removeChild( node );}
				else if( email.value ) {
					errors( email, 'required-email', 'Enter a valid e-mail address, for example: address@domain.com' );
					
				}
				else{
					errors( email, 'required-email', msg );
					
				}
				
			}

			if(( !nom.value ) && ( !email.value ) ) {
				errormsg = nom;
			}
			else if(( !nom.value ) && ( email.value ) ) {
				errormsg = nom;
			}
			else if((!nom.value ) && ( !isEmail( email.value) ) ) {
				errormsg = nom;
			}
			else if((nom.value ) && ( !email.value ) ) {
				errormsg = email;
			}
			else if((nom.value ) && ( !isEmail( email.value) ) ) {
				errormsg = email;
			}
			errormsg.focus();

		}
		//Envois avec succès
		else{
			var success = document.createElement( 'p' );
			var successText = document.createTextNode( 'Your vote has been sent! Thank you for your time.' );
			success.appendChild( successText );
			success.setAttribute( 'class','success' );
			success.classList.add('a42-bgcolor-c5');
			success.setAttribute( 'id','msg-success' );
			successmessage.appendChild( success );
			myForm.remove();
			//reset
			nom.value = '';
			email.value = '';
			success.focus();

		}
		function errors( obj, label, text ){
			var text = document.createTextNode( text );
			var required = document.createElement( 'span' );
			var span = document.createElement( 'span' );			
			var parent = obj.parentNode;
			required.appendChild( span );
			span.appendChild( text );
			required.classList.add('required' );
			required.classList.add('a42-error-msg' );
			parent.insertBefore( required, obj );
			required.setAttribute( 'id', label );
			obj.classList.add('required' );
			obj.setAttribute( 'data-message', label );
		}	
		
		// 
		function deleteErrors(){
			for( var i = 0, len = arrayInput.length; i < len; i++ ){
				var node = document.getElementById( arrayInput[i].getAttribute( 'data-message' ) );
				if( node ) {
					node.parentNode.removeChild( node );
				}
			}
			//reset
			nom.removeAttribute('aria-required');
			nom.classList.remove('required');
			email.removeAttribute('aria-required');
			email.classList.remove('required');
			//efface le message de succès
			var node = document.getElementById( 'msg-success' );
			if( node ) node.parentNode.removeChild( node );
		}
		// vérification de l'adresse email
		function isEmail( mail ){
			var regMail = new RegExp('^[0-9a-z._-]+@{1}[0-9a-z.-]{2,}[.]{1}[a-z]{2,5}$','i');
			return regMail.test( mail );
		}
		event.preventDefault();
	}, false );
