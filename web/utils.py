#!/usr/bin/env python
#coding:utf-8
#__author__="ybh"
import paramiko
from sql import settings
def ssh_cmd(ip,port,cmd):
    s = paramiko.SSHClient()
    # s.load_system_host_keys()
    s.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    s.connect(hostname=ip, username='root', port=port, key_filename=settings.RSA_PRIVATE_KEY_FILE)
    stdin, stdout, stderr = s.exec_command(cmd)
    result = stdout.readlines()
    s.close()
    return result