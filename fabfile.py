#!/usr/bin/env python
# -*- coding: utf-8 -*-

from datetime import datetime
from fabric.api import *
import os
# 登录用户和主机名：
env.user = 'root'
env.sudo_user = 'root'
env.hosts = ['107.175.60.87'] # 如果有多个主机，fabric会自动依次部署
env.password='gsp191954'
    


def node():
    deploy_to = '/home'
    # local('cd www&&ls')
    # local('ls')    
    with cd(deploy_to):
        run('curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.31.0/install.sh | bash')
        run('nvm install 8.10.0')

def deploy():
    deploy_to = '/home/nuxta'
    local('git push virmach master')
    with cd(deploy_to):
        run('git push origin master')
        run('export PATH=$PATH:/root/.nvm/versions/node/v8.10.0/bin')
        run('npm install')
        run('npm build')
        run('npm start')

def nginx():
    deploy_to = '/home'
    local('scp nginx.conf root@107.175.60.87:/etc/nginx/nginx.conf') 
    with cd(deploy_to):
        run('service nginx restart')


# task :log do
#   queue %[sudo cp /var/log/nginx/error.log #{deploy_to}/log/nginx.error.log]
#   queue %[sudo cp /var/log/nginx/access.log #{deploy_to}/log/nginx.access.log]
#   to :after_hook do
#     queue %[scp #{user}@#{domain}:#{deploy_to}/log/unicorn.error.log tmp/log]
#     # queue %[scp #{user}@#{domain}:#{deploy_to}/log/unicorn.out.log tmp/log]
#     queue %[scp #{user}@#{domain}:#{deploy_to}/log/nginx.error.log tmp/log]
#     queue %[scp #{user}@#{domain}:#{deploy_to}/log/nginx.access.log tmp/log]
#   end
#   # queue "tail -f -n 60 #{deploy_to}/log/unicorn.error.log"
#   # queue 'tail -f -n 60 /var/log/nginx/error.log'
#   # queue "tail -f -n 60 #{deploy_to}/log/unicorn.out.log"
#   # queue 'tail -f -n 60 /var/log/nginx/access.log'
# end
# # get(remote_path="/tmp/log_extracts.tar.gz", local_path="/logs/new_log.tar.gz")
# # # Download a database back-up
# # get("/backup/db.gz", "./db.gz")

def log():
    deploy_to = '/home/gsp/wd/change'
    local('scp gsp@changiif.com:/var/log/nginx/error.log tmp/nginx.error.log')
    local('scp gsp@changiif.com:/var/log/nginx/access.log tmp/nginx.access.log')
    local('scp gsp@changiif.com:/home/gsp/wd/change/log/unicorn.error.log tmp/unicorn.error.log')
    
    # local('scp gsp@changiif.com:/home/gsp/wd/change/log/unicorn.out.log tmp/unicorn.out.log')
   
    # get(remote_path=deploy_to+"/log/unicorn.error.log", local_path="/log/",use_sudo=True)
    # get(remote_path=deploy_to+"/log/unicorn.out.log", local_path="/log/",use_sudo=True)
    # get(remote_path="/var/log/nginx/error.log", local_path="/log/",use_sudo=True)
    # get(remote_path="/var/log/nginx/access.log", local_path="/log/",use_sudo=True)
    

