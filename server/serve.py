#write a flask server code
from flask import Flask, request, jsonify
import json
import requests
import os
from flask_cors import CORS  

app = Flask(__name__)
CORS(app) 

@app.route('/check-auth', methods=['POST'])
def check_auth():
    data = request.get_json()
    if data['username'] == 'admin' and data['password'] == 'admin':
        print("User Authenticated")
        return jsonify({'status': 'success'})
    else:
        print("User Not Authenticated")
        return jsonify({'status': 'failed'})


if __name__ == '__main__':
    app.run(host='0.0.0.0')