$("#register").click(function()
		{
		alert(validate());
		 if(validate()){
			checkUser();
		} 
	});
	function checkUser()
		{
			var email   = $("#txtEmail").val();
				$.ajax({
						url: 'rest/search/checkemail?email='+email,
						type : "GET",
						datatype : 'json',
						cache : false,
						success : function(data) 
						{
							if(data.results[0].values == 0)
							{
								signUp();
							}
							else
							{
							alert("email already exists");
							}
						},
						error : function(xhr, data, statusText,errorThrown) 
						{
							console.log("The following error occured: "+ statusText, data, xhr, errorThrown);
						}
					 });
		}
	function signUp()
	{
		var username = $("#txtUsername").val();
		var email   = $("#txtEmail").val();
		var pwd   = $("#txtPwd").val();
			$.ajax({
					url : 'rest/search/signup',
					data :{username: username, password: pwd, email: email},
					type : "POST",
					cache : false,
					success : function(data)
					{
						alert("Your enquiry has been sent well get in touch shortly");
						NavigateTo("login.html");		
					},
					error : function(xhr, data, statusText,errorThrown)
					{
						// log the error to the console
						console.log("The following error occured: "+ statusText, errorThrown);
					}
				});
	}

	function validate()
	{
		var username = $("#txtUsername").val();
		var email   = $("#txtEmail").val();
		var pwd   = $("#txtPwd").val();
		var cnfemail   = $("#txtCnfEmail").val();
		var cnfpwd   = $("#txtCnfPwd").val();
		var filter = /^\b[A-Z0-9._%-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b$/i;
		var pattern = /^\b[a-zA-Z0-9_-]\b$/i;
			if (username == "" || !pattern.test(username) == false) 
				{
                alert("incorrect username");    
				return false;
				}
			else if (pwd == "") 
				{
				alert("password should not be empty");
					return false;
				}
			else if (pwd != cnfpwd) 
				{
					alert("password and confirmed password  should be matched");
					return false;
				}
           else if (email == "" || filter.test(email) == false) 
           		{
        	   		alert("email should not be empty");
        	   		return false;
           		} 
           else if (email != cnfemail ) 
		        {
        	        alert("email and confirmed email  should be matched");
		            return false;
		        }
           else
           		{
        	   		return true;
           		}
	}