from django.shortcuts import render,HttpResponse

# Create your views here.
import json
from web import utils
def index(request):
    if request.method=='GET':
        return render(request,'index.html')
    else:
        ip=request.POST.get('IP')
        port=request.POST.get('port')
        database=request.POST.get('database')
        username=request.POST.get('user')
        password=request.POST.get('passwd')
        sql=request.POST.get('sql')
        cmd="/usr/local/webserver/SQLadvisor/sqladvisor/sqladvisor -h {} -u {} -p '{}' -P {} -d {} -q \"{}\" -v 1 2> /tmp/sql.log;cat /tmp/sql.log".format(ip,username,password,port,database,sql)
        result=utils.ssh_cmd("192.168.100.2",22,cmd)
        result=[x.strip('\n') for x in result]
        result=json.dumps(result)
        return HttpResponse(result)
