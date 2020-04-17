import React from 'react';
import axios from 'axios';

class RestAuthentication extends React.Component {
	state = {
		authentication: {},
		notification: {}
	}
	
	componentDidMount() {
		// authentication
		const userinfo = { 
			'username': 'testuser', 
			'password': 'testpassword' 
		};
		axios.post(
				'https://gpew1dlmkg.execute-api.ap-southeast-2.amazonaws.com/prod/authenticate',
				userinfo,
				{ headers: {
					'Content-Type' : 'application/json'
				} 
			})
			.then(res => {
				const authentication = res.data;
				this.setState({ authentication:authentication });
				console.log(authentication);
			});
		// notification
		axios.get(
				'https://pecnupsocd.execute-api.ap-southeast-2.amazonaws.com/send/testnotification',
				{ headers: {
					'Content-Type' : 'application/json',
					'Authorization' : 'eyJraWQiOiJQZCtjOGtGSzZBSXRnb3RrU2w4dmtkcnIyS0o5eXdSdEVmVzVudmFGOGZBPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJkNmU3ODMyYi1lNTNhLTQyY2MtYTM3NS04MDM5ZWQxYjNhMjIiLCJhdWQiOiIzOG9jcTNvc2N0ZXQydnZ0N2gwM2RqamU5NSIsImV2ZW50X2lkIjoiYWE0NTBjODMtNDY2Zi00M2M5LTg2NjAtODE0NjBmZjRhNjA3IiwidG9rZW5fdXNlIjoiaWQiLCJhdXRoX3RpbWUiOjE1ODcxNDU0NzcsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC5hcC1zb3V0aGVhc3QtMi5hbWF6b25hd3MuY29tXC9hcC1zb3V0aGVhc3QtMl9JWnVoaHhTZnciLCJjb2duaXRvOnVzZXJuYW1lIjoidGVzdHVzZXIiLCJleHAiOjE1ODcxNDkwNzcsImlhdCI6MTU4NzE0NTQ3N30.afxOvKQTd-9wq_SPZKc3emXN7U39cmp7YE-fjF3Q8XC2WzBhCc48A4pDKvs2YO2AxpDFSs9Za-ybRe5leCW0PM6XDtbyz1uQObZeARKxQT6VdifdUGXsJwcOqsHudGmBSyx2jO0CPuitsF6-CvjJ_mtcz3IXsBKO29iZffp5Q07q3RvOoGl03Qg2Fx2jgAqNkSBZ38do4pGKf4Kk_C6lPN3Kge4HstnzZSHJYipbvQkhVZhK3qBqY7N06t1ZTCPOpthA9wVXyJKzLHz08wCxS0S_Mg1Rb0QYaxHtaVF15Gcqg80UXnCp67ej0NgF3XlSXMsl0nHFLx8i77kkSDuR9A'
				} 
			})
			.then(res => {
				const notification = res.data;
        		this.setState({ notification:notification });
				console.log(notification);
			});
	}
	
	render() {
		return (
			<div>
				<p>Status: {this.state.authentication.status}</p>
				<p>UserId: {this.state.authentication.user_id}</p>

				<p>Status: {this.state.notification.status}</p>
				<p>Message: {this.state.notification.message}</p>
			</div>
		)
	}
}

export default RestAuthentication;