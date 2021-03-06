<%@ page language="java" contentType="text/html; charset=EUC-KR"
    pageEncoding="EUC-KR"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>HUNGRY?</title>
<script src="https://code.jquery.com/jquery-1.11.2.min.js"></script>
<script
	src="https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.7.0/underscore.js"></script>
<script
	src="https://cdnjs.cloudflare.com/ajax/libs/json2/20140204/json2.js"></script>
<script src="js/slidr.js"></script>
<script src="js/jquery.raty.js"></script>
<script src="js/jquery.modal.js"></script> 
<script type="text/javascript">
	sessionStorage.setItem("id", "<%=session.getAttribute("id")%>")
	sessionStorage.setItem("pw", "<%=session.getAttribute("pw")%>")
	sessionStorage.setItem("name", "<%=session.getAttribute("name")%>")
	sessionStorage.setItem("thumb", "<%=session.getAttribute("thumb")%>")
</script>
<script src="js/login-indexHandler.js"></script>
<script src="js/customFunction.js"></script>
<script src="js/custom.js"></script>
<script src="js/loginCheck.js"></script>
<script src="js/viewController.js"></script>
<script src="js/historyController.js"></script>
<script src="js/favoriteController.js"></script>
<script src="js/imgUpload.js"></script>
<script src="js/imgslide.js"></script>

<!-- 	<script src="http://code.jquery.com/mobile/1.0.1/jquery.mobile-1.0.1.min.js"></script> -->

<link rel="stylesheet"
	href="http://yui.yahooapis.com/pure/0.5.0/pure-min.css">
<link rel="stylesheet"
	href="http://yui.yahooapis.com/pure/0.5.0/grids-responsive-min.css">
<link rel="stylesheet" href="css/jquery.raty.css">
<link rel="stylesheet"
	href="//maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css">
<link rel="stylesheet" href="css/blog.css">
<link rel="stylesheet" href="css/custom.css">
<link rel="stylesheet" href="css/jquery.modal.css">
<link rel="stylesheet" href="css/collection.css">
</head>
<body>
	<div id="layout" class="pure-g">
		<div class="sidebar pure-u-1 pure-u-md-1-4">
			<div class="header">
				<h1 class="brand-title" id="bi">
					<a href="http://localhost:8080">HUNGRY?</a>
				</h1>
				<h2 class="brand-tagline" id="desc">Where to GO?</h2>

				<nav class="nav">
					<ul class="nav-list">
						<li id="timeline-button" class="nav-item"><a
							class="pure-button" href="#">Timeline</a></li>
						<li id="collection-button" class="nav-item"><a
							class="pure-button" href="#">Collection</a></li>
					</ul>
				</nav>
			</div>
			<div class="profile">
				<div class="logon">
					<!-- User Thumb, User Info Cnt -->
					<div id="profile_cog">
						<!--프로필 수정 -->
						<a href="#profile_edit" rel="modal:open">
							<button class="pure-button profile-cog" id="profile_cog">
								<i class="fa fa-cog"></i>
							</button>
						</a>
					</div>
					<div class="thumb"></div>
					<div class="info"></div>
					<div class="logout">
						<button class="pure-button" id="log_out">Log out</button>
					</div>
				</div>
				<div class="logoff" style="display: none;">
					<!-- Login Button, SignIn Button -->
					<a href="#login-modal" rel="modal:open">
						<button class="pure-button login">
							<i class="fa fa-user"></i> Log In
						</button>
					</a> <a href="#signin-modal" rel="modal:open">
						<button class="pure-button signin">
							<i class="fa fa-sign-in"></i> Sign Up
						</button>
					</a>
				</div>
			</div>

		</div>

		<div class="content pure-u-1 pure-u-md-3-4">
			<div id="main-view">
				<div>
					<div class="write-post">
						<button id="write_post"><h1>Write Post</h1></button>
						<div id="w_checkbox" style="display:none;">
							<form action="" id="content_info" enctype="multipart/form-data" method="post">
								<div class="type_wrapper">
									<div class=type_name>
										<h3>TYPE</h3>
									</div>
									<div class="type_property">
										<p>Korean</p>
										<input type="checkbox" class="property" name="f_type"
											value="korean">
										<p>Chines</p>
										<input type="checkbox" class="property" name="f_type"
											value="chines">
										<p>Japanes</p>
										<input type="checkbox" class="property" name="f_type"
											value="japanes">
										<p>European</p>
										<input type="checkbox" class="property" name="f_type"
											value="european">
										<p>American</p>
										<input type="checkbox" class="property" name="f_type"
											value="american">
										<p>Mexican</p>
										<input type="checkbox" class="property" name="f_type"
											value="mexican">
										<p>ETC</p>
										<input type="checkbox" class="property" name="f_type" value="etc">
									</div>
								</div>
		
								<div class="taste_wrapper">
									<div class="taste_name">
										<h3>TASTE</h3>
									</div>
									<div class="taste_property">
										<p>Hot</p>
										<input type="checkbox" class="property" name="taste" value="hot">
										<p>Sweet</p>
										<input type="checkbox" class="property" name="taste"
											value="sweet">
										<p>신맛</p>
										<input type="checkbox" class="property" name="taste" value="sin">
										<p>Saulty</p>
										<input type="checkbox" class="property" name="taste"
											value="saulty">
									</div>
								</div>
		
								<div class="time_wrapper">
									<div class="time_name">
										<h3>TIME</h3>
									</div>
									<div class="time_property">
										<p>Breakfast</p>
										<input type="checkbox" class="property" name="time" value="bf">
										<p>Lunch</p>
										<input type="checkbox" class="property" name="time" value="lc">
										<p>Dinner</p>
										<input type="checkbox" class="property" name="time" value="dn">
									</div>
								</div>
		
								<div class="location_wrapper">
									<div class="location_name">
										<h3>지역</h3>
										<!-- select -->
									</div>
									<div class="location_property">
										<select name=location id="locationSel">
											<option value=none selected>지역선택</option>
											<option value=Seoul>서울</option>
											<option value=KK>경기</option>
											<option value=KW>강원</option>
											<option value=KS>경상</option>
											<option value=CC>충청</option>
											<option value=JR>전라</option>
											<option value=JJ>제주</option>
										</select>
									</div>
								</div>
						</form>
					</div>	
					<div id="img_wrapper">
						<div id="img_upload_div"><form method="POST" enctype="multipart/form-data" action="" id="img_upload_frm"><input type="file" id="img_Upload" name="img-Upload" multiple></form></div>
						<div id="img_preview"></div>
					</div>
					<textarea id="write"></textarea>		
					<div id="write_post_btn" class="pure-button">Post</div>				
					</div>
					<!-- A wrapper for all the blog posts -->
					<!--            <div class="posts">
	                <h1 class="content-subhead">Pinned Post</h1>
	                <section class="post">
	                    <header class="post-header">
	                        <img class="post-avatar" alt="Tilo Mitra&#x27;s avatar" height="48" width="48" src="img/common/tilo-avatar.png">
	
	                        <h2 class="post-title">Introducing Pure</h2>
	
	                        <p class="post-meta">
	                            By <a href="#" class="post-author">Tilo Mitra</a> under <a class="post-category post-category-design" href="#">CSS</a> <a class="post-category post-category-pure" href="#">Pure</a>
	                        </p>
	                    </header>
	
	                    <div class="post-description">
	                        <p>
	                            Yesterday at CSSConf, we launched Pure – a new CSS library. Phew! Here are the <a href="https://speakerdeck.com/tilomitra/pure-bliss">slides from the presentation</a>. Although it looks pretty minimalist, we’ve been working on Pure for several months. After many iterations, we have released Pure as a set of small, responsive, CSS modules that you can use in every web project.
	                        </p>
	                    </div>
	                </section>
	                 -->
				</div>
				<div class="tab-layer content-subhead">
					<ul class="tab-btn">
						<li><button id="recent_tab_btn">
								<h1 class="content-subhead">Recent Posts</h1>
							</button></li>
						<li><button id="popular_tab_btn">
								<h1 class="content-subhead">Popular Posts</h1>
							</button></li>
					</ul>
				</div>
				<div id="recent_post" class="posts"></div>
				<div id="popular_post" style = "display : none;">여기는 백지장같이 하얀곳입니다
					커스텀.js고칠생각하니 막막하네욯 냉면과 물만두 만두와 맥주</div>
			</div>


			<!-- 현우 collection -->
			<!-- top-button -->
			<div id="top" style="display: none;">
				<button id="howAbout-button">
					<h1>How About</h1>
				</button>
				<button id="search-button">
					<h1>Search</h1>
				</button>
				<button id="favorite-button">
					<h1>Favorite</h1>
				</button>
				<button id="history-button">
					<h1>History</h1>
				</button>

				<h2 class="top_explain">Please click a menu.</h2>
			</div>
			<div id = top-line>
			
			</div>


			<!-- How About -->
			<div id = "howAbout">
				코드
			</div>
			<!-- end of How About -->
			<!-- search -->
			<div id="search">
				<h2 id="search-explain">&nbsp;&nbsp;Choose you want</h2>
				<div id="checkbox">
					<form action="" id="checkbox-type">
						<div class="type_wrapper">
							<div class=type_name>
								<h3>TYPE</h3>
							</div>
							<div class="type_property">
								<p>Korean</p>
								<input type="checkbox" class="property" name="type"
									value="korean">
								<p>Chines</p>
								<input type="checkbox" class="property" name="type"
									value="chines">
								<p>Japanes</p>
								<input type="checkbox" class="property" name="type"
									value="japanes">
								<p>European</p>
								<input type="checkbox" class="property" name="type"
									value="european">
								<p>American</p>
								<input type="checkbox" class="property" name="type"
									value="american">
								<p>Mexican</p>
								<input type="checkbox" class="property" name="type"
									value="mexican">
								<p>All</p>
								<input type="checkbox" class="property" name="type" value="ty-all">
							</div>
						</div>

						<div class="taste_wrapper">
							<div class="taste_name">
								<h3>TASTE</h3>
							</div>
							<div class="taste_property">
								<p>매운맛</p>
								<input type="checkbox" class="property" name="taste" value="hot">
								<p>단맛</p>
								<input type="checkbox" class="property" name="taste" value="sweet">
								<p>신맛</p>
								<input type="checkbox" class="property" name="taste" value="sin">
								<p>짠맛</p>
								<input type="checkbox" class="property" name="taste" value="saulty">
								<p>모두</p>
								<input type="checkbox" class="property" name="taste" value="ta-all">	
							</div>
						</div>

						<div class="time_wrapper">
							<div class="time_name">
								<h3>TIME</h3>
							</div>
							<div class="time_property">
								<p>아침</p>
								<input type="checkbox" class="property" name="time" value="bf">
								<p>점심</p>
								<input type="checkbox" class="property" name="time" value="lc">
								<p>저녁</p>
								<input type="checkbox" class="property" name="time" value="dn">
								<p>모두</p>
								<input type="checkbox" class="property" name="time" value="ti-all">
							</div>
						</div>

						<div class="location_wrapper">
							<div class="location_name">
								<h3>지역</h3>
								<!-- select -->
							</div>
							<div class="location_property">
								<select name=location>
									<option value=1 selected>서울</option>
									<option value=2>경기</option>
									<option value=3>강원</option>
									<option value=4>경상</option>
									<option value=5>충청</option>
									<option value=6>전라</option>
									<option value=7>제주</option>
								</select> 
								<input type="button" value="SEARCH" id="search-submit-button">
								<input type = "button" value = "CLEAR" id = "search-clear-button">
							</div>
						</div>
					</form>
				</div>
			</div>
			<!-- search end -->
			<!-- favorite start -->
			<div id = "favorite">
				<div class = "favorite_explain">
					Here are postings you are interested in.
				</div>
				<div id="favoritePosting"></div>
			</div>
			<!-- favorite end -->
			<!-- history start -->
			<div id = "history">
				<button id = "history-posting-button">
					POSTING
				</button>
				<button id = "history-comment-button">
					COMMENT
				</button>
				<div id = "history-posting"></div>
				<div id = "history-comment"></div>
				
			</div>
			<!-- history end -->
			
			
			<div class="footer">
				<div class="pure-menu pure-menu-horizontal pure-menu-open">
					<ul>
						<li><a href="#">About</a></li>
						<li><a href="#">Twitter</a></li>
						<li><a href="#">GitHub</a></li>
					</ul>
				</div>
			</div>
		</div>
	</div>


	<!-- Modal Start -->
	<form action="" class="login_form modal" id="login-modal"
		style="position: fixed; top: 50%; left: 50%; margin-top: -116.5px; margin-left: -200px; z-index: 2; display: none;">
		<h3>Please login to continue</h3>
		<p>
			<label></label><input type="text" id="user_id" placeholder=" ID">
		</p>
		<p>
			<label></label><input type="password" id="user_pass"
				placeholder=" Password">
		</p>
		<p>
			<input type="button" value="Login" id="login-submit">
		</p>
	</form>

	<form action="" class="signin_form modal" id="signin-modal"
		style="position: fixed; top: 50%; left: 50%; margin-top: -116.5px; margin-left: -200px; z-index: 2; display: none;">
		<h3>Please Fill out this form to Sign in</h3>
		<p>
			<label></label><input type="text" id="user_signin_id"
				placeholder=" ID">
		</p>
		<p>
			<label></label><input type="text" id="user_signin_name"
				placeholder=" Nick-name">
		</p>
		<p>
			<label></label><input type="password" id="user_signin_pass"
				placeholder=" Password">
		</p>
		<p>
			<label></label><input type="password" id="user_signin_passconf"
				placeholder=" Confirmation">
		</p>
		<p>
			<input type="button" value="Signin" id="signin-submit">
		</p>
	</form>

	<form action="" class="profile-edit modal" id="profile_edit"
		style="position: fixed; top: 50%; left: 50%; margin-top: -116.5px; margin-left: -200px; z-index: 2; display: none;">
		<h3>Please Fill out this form to Sign in</h3>
		<p>
			<label></label><input type="text" id="user_edit_id" placeholder=" ID"
				READONLY>
		</p>
		<p>
			<label></label><input type="text" id="user_edit_name"
				placeholder=" Nick-name" onfocus="this.value=''">
		</p>
		<p>
			<label></label><input type="password" id="user_edit_pass"
				placeholder=" Password">
		</p>
		<p>
			<label></label><input type="password" id="user_edit_passconf"
				placeholder=" Confirmation">
		</p>
		<p>
			<input type="button" value="Profile Edit" id="profile-edit-submit">
			<input type="button" value="Withdrawal" id="user-delete-submit">
		</p>
	</form>

	<form action="" class="post-editmd modal" id="post_edit"
		style="position: fixed; top: 50%; left: 50%; margin-top: -116.5px; margin-left: -200px; z-index: 2; display: none;">
		<p>
			<textarea id="post_edit_area"></textarea>
		</p>
		<input type="button" value="Withdrawal" id="post-edit-submit">
	</form>
	
	<form action="" class="more-contentmd modal" id="more_content"
		style="position: fixed; top: 50%; left: 50%; width: 80%; height: 60%; margin-top: -80px; margin-left: -200px; z-index: 2; display: none;">
		<div id="more_content_body">
			<span>글글글 글이들어가신다</span>
		</div>
	</form>
	<!-- Modal End -->


</body>
</html>
