package com.metl.persisted

import com.metl.data._
import com.metl.utils._

class PersistedConversations(config:ServerConfiguration,dbInterface:PersistenceInterface,onConversationDetailsUpdated:Conversation=>Unit) extends ConversationRetriever(config,onConversationDetailsUpdated) {
  override def getAllConversations = dbInterface.getAllConversations
  override def getAllSlides = dbInterface.getAllSlides
  override def search(query:String) = dbInterface.searchForConversation(query)
  override def searchByCourse(courseId:String) = dbInterface.searchForConversationByCourse(courseId)
  override def getConversationsForSlideId(jid:String):List[String] = dbInterface.getConversationsForSlideId(jid)
  override def detailsOf(jid:String) = dbInterface.detailsOfConversation(jid)
  override def detailsOfSlide(jid:String) = dbInterface.detailsOfSlide(jid)
  override def createConversation(title:String,author:String):Conversation = dbInterface.createConversation(title,author)
  override def createSlide(author:String,slideType:String = "SLIDE",grouping:List[GroupSet] = Nil):Slide = dbInterface.createSlide(author,slideType,grouping)
  override def deleteConversation(jid:String):Conversation = dbInterface.deleteConversation(jid)
  override def renameConversation(jid:String,newTitle:String):Conversation = dbInterface.renameConversation(jid,newTitle)
  override def changePermissions(jid:String,newPermissions:Permissions):Conversation = dbInterface.changePermissionsOfConversation(jid,newPermissions)
  override def updateSubjectOfConversation(jid:String,newSubject:String):Conversation = dbInterface.updateSubjectOfConversation(jid,newSubject)
  override def addSlideAtIndexOfConversation(jid:String,index:Int,slideType:String):Conversation = dbInterface.addSlideAtIndexOfConversation(jid,index,slideType)
  override def addGroupSlideAtIndexOfConversation(jid:String,index:Int,grouping:GroupSet):Conversation = dbInterface.addGroupSlideAtIndexOfConversation(jid,index,grouping)
  override def reorderSlidesOfConversation(jid:String,newSlides:List[Slide]):Conversation = dbInterface.reorderSlidesOfConversation(jid,newSlides)
  override def updateConversation(jid:String,conversation:Conversation):Conversation = dbInterface.updateConversation(jid,conversation)
}
