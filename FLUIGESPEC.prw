#include "PROTHEUS.CH"
#INCLUDE "FWMVCDEF.CH"
#INCLUDE "RESTFUL.CH"
#INCLUDE  'totvs.ch' 
#DEFINE OPC 5

User Function FLUIGESPEC()
Return


WsRestful Clientes Description "Clientes" Format APPLICATION_JSON
	WSDATA codCli As String
	WSDATA codLoja As String
	WsMethod GET Description "Retorna lista de Clientes" WsSyntax "/GET/{method}"
End WsRestful


WsMethod GET WSRECEIVE codCli,codLoja WSSERVICE Clientes

Local _aArea 	 	:= GetArea()
Local _cQuery 		:= ""
Local cNextAlias 	:= GetNextAlias()
Local _cXml 		:= ''
Local _cCodCli	:= Iif(ValType(Self:codCli) <> 'U',Self:codCli,'')
Local _cCodLoja	:= Iif(ValType(Self:codLoja) <> 'U',Self:codLoja,'')
Local cJsonRet		:= ''

::SetContentType('application/xml')

_cQuery := " SELECT * " + CRLF
_cQuery += " FROM " + RetSqlName("SA1") + " SA1 " + CRLF
_cQuery += " WHERE " + CRLF
_cQuery += " SA1.A1_FILIAL = '" + FWxFilial('SA1') + "' " + CRLF
If !Empty(_cCodCli)
	_cQuery += " AND SA1.A1_COD = '" + AllTrim(_cCodCli) + "' " + CRLF
EndIf
If !Empty(_cCodLoja)
	_cQuery += " AND SA1.A1_LOJA = '" + AllTrim(_cCodLoja) + "' " + CRLF
EndIf
_cQuery += " AND SA1.D_E_L_E_T_ = ' ' " + CRLF
_cQuery += " ORDER BY SA1.A1_COD " 
_cQuery := ChangeQuery(_cQuery)

Conout('QUERY - ' + _cQuery)
If Select(cNextAlias) > 0
	dbSelectArea(cNextAlias)
	dbCloseArea()
	cNextAlias 	:= GetNextAlias()
EndIf

dbUseArea(.T.,'TOPCONN',TCGENQRY(,,_cQuery),cNextAlias,.T.,.T.)
dbSelectArea(cNextAlias)
If !(cNextAlias)->(Eof()) .And. !(cNextAlias)->(Bof())

	cJsonRet := '{'
	cJsonRet += '	"Clientes" : [ '

	While !(cNextAlias)->(Eof())
		cJsonRet +=	'{'
		cJsonRet += '"codigo": "'      +  AllTrim((cNextAlias)->A1_COD)   + '" ,'
		cJsonRet += '"loja": "'      +  AllTrim((cNextAlias)->A1_LOJA)   + '" ,'
		cJsonRet += '"email": "'      +  AllTrim((cNextAlias)->A1_XMAILLD)   + '" ,'
		cJsonRet += '"nome": "'      +  AllTrim((cNextAlias)->A1_NOME)   + '" '
		cJsonRet += ' },'
		(cNextAlias)->(dbSkip())
	EndDo

	cJsonRet := substr( Alltrim(cJsonRet) , 1 , len(Alltrim(cJsonRet)) -1 )
	cJsonRet += '	]'
	cJsonRet += '}'
	cJsonRet := StrTran(cJsonRet,Chr(129),"")
	cJsonRet := StrTran(cJsonRet,Chr(141),"")
	cJsonRet := StrTran(cJsonRet,Chr(143),"")
	cJsonRet := StrTran(cJsonRet,Chr(144),"")
	cJsonRet := StrTran(cJsonRet,Chr(157),"")
	cJsonRet := StrTran(cJsonRet,Chr(9),"")
	cJsonRet := StrTran(cJsonRet,Chr(10),"")
	cJsonRet := StrTran(cJsonRet,Chr(13),"")
	conout("WSREST - " + cJsonRet)
	cJsonRet := FwCutOff(cJsonRet,.F.)		
	::SetResponse(FwNoAccent(cJsonRet))			
Else
	cJsonRet := '{'
	cJsonRet += '	"Clientes" : [ '
	cJsonRet += '	"VAZIO" '
	cJsonRet += '	]'
	cJsonRet += '}'	
	::SetResponse(FwNoAccent(cJsonRet))	
EndIf

RestArea(_aArea)

Return(.T.)

WsRestful ClientesList Description "Lista de Clientes" Format APPLICATION_JSON
	WSDATA CodClientes As String
	WSDATA CodLoja As String
	WsMethod GET Description "Retorna lista dos Clientes" WsSyntax "/GET/{method}"
End WsRestful

WsMethod GET WSRECEIVE CodClientes WSSERVICE ClientesList

Local _aArea 	 	:= GetArea()
Local _cQuery 		:= ""
Local _cNextAlias 	:= GetNextAlias()
Local _cXml 		:= ''
Local _cCodCli		:= Iif(ValType(Self:CodClientes) <> 'U',Self:CodClientes,'')
Local _cCodLoja		:= Iif(ValType(Self:CodLoja) <> 'U',Self:CodLoja,'')
Local cJsonRet		:= ''

::SetContentType('application/xml')

_cQuery := " SELECT * " + CRLF
_cQuery += " FROM " + RetSqlName("SA1") + " SA1 " + CRLF
_cQuery += " WHERE " + CRLF
_cQuery += " SA1.A1_FILIAL = '" + xFilial('SA1') + "' " + CRLF
If !Empty(_cCodCli)
	_cQuery += " AND SA1.A1_COD = '" + AllTrim(_cCodCli) + "' " + CRLF
EndIf
If !Empty(_cCodCli)
	_cQuery += " AND SA1.A1_LOJA = '" + AllTrim(_cCodLoja) + "' " + CRLF
EndIf
_cQuery += " AND SA1.D_E_L_E_T_ = '' " + CRLF
_cQuery += " ORDER BY SA1.A1_COD " 
_cQuery := ChangeQuery(_cQuery)

If Select(_cNextAlias) > 0
	dbSelectArea(_cNextAlias)
	dbCloseArea()
EndIf

dbUseArea(.T.,'TOPCONN',TCGENQRY(,,_cQuery),_cNextAlias,.T.,.T.)
dbSelectArea(_cNextAlias)
If !(_cNextAlias)->(Eof()) .And. !(_cNextAlias)->(Bof())
	
	cJsonRet := '{'
	cJsonRet += '	"ClientesList" : [ '

	While !(_cNextAlias)->(Eof())
		cJsonRet +=	'{'
		cJsonRet += '"Codigo": "'      + AllTrim((_cNextAlias)->A1_COD) + '",'
		cJsonRet += '"Loja": "'      + AllTrim((_cNextAlias)->A1_LOJA) + '",'
		cJsonRet += '"Nome": "'      + AllTrim((_cNextAlias)->A1_NOME) + '",'
		cJsonRet += '"Email": "' + AllTrim(STRTRAN((_cNextAlias)->A1_XMAILLD,'"',''))   + '",'
		cJsonRet += ' },'
		(_cNextAlias)->(dbSkip())
	EndDo

	cJsonRet := substr( Alltrim(cJsonRet) , 1 , len(Alltrim(cJsonRet)) -1 )
	cJsonRet += '	]'
	cJsonRet += '}'
	cJsonRet := StrTran(cJsonRet,Chr(129),"")
	cJsonRet := StrTran(cJsonRet,Chr(141),"")
	cJsonRet := StrTran(cJsonRet,Chr(143),"")
	cJsonRet := StrTran(cJsonRet,Chr(144),"")
	cJsonRet := StrTran(cJsonRet,Chr(157),"")
	cJsonRet := StrTran(cJsonRet,Chr(9),"")
	cJsonRet := StrTran(cJsonRet,Chr(10),"")
	cJsonRet := StrTran(cJsonRet,Chr(13),"")
	conout("WSREST - " + cJsonRet)
	cJsonRet := FwCutOff(cJsonRet,.F.)		
	::SetResponse(FwNoAccent(cJsonRet))	

	//Conout(_cXml)
Else
	cJsonRet := '{'
	cJsonRet += '	"ClientesList" : [ '
	cJsonRet += '	"VAZIO" '
	cJsonRet += '	]'
	cJsonRet += '}'	
	::SetResponse(FwNoAccent(cJsonRet))	
EndIf

RestArea(_aArea)

Return(.T.)
