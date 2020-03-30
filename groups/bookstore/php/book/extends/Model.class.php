<?php
/**
  *  数据库操作类
  * author  小艳艳
  * date 2016-03-01
*/
class Model{
	protected $link;			//mysql的连接对象
	protected $tabName;		//表名
	protected $pk = "id";		//主键的字段名
	protected $fieldList = array();		//字段列表
	protected $fields;					//要查询的字段
	protected $where;
	protected $order;
	protected $limit;
	
	/**
	  * 构造方法
	  * @param string $tabName  表名
	*/
	public function __construct($tabName){
		$this->link = mysqli_connect(HOST, USER, PASS, DBNAME) or die ('连接失败');
		mysqli_query($this->link, "set names utf8");
		$this->tabName = $tabName;
		//自动获取id  自动获取字段列表
		$this->getField();
	}
	
	/**
	  *  查询数据
	  * @return array 二维数据
	*/
	public function select(){
		$fields = "*";
		if (!empty($this->fields)) {
			$fields = $this->fields;
			$this->fields = null;
		}
		
		$where = "";
		if (!empty($this->where)) {
			$where = " where ".$this->where;
			$this->where = null;
		}
		
		$order = "";
		if (!empty($this->order)) {
			$order = " order by ".$this->order;
			$this->order = null;
		}
		
		$limit = "";
		if (!empty($this->limit)) {
			$limit = " limit ".$this->limit;
			$this->limit = null;
		}
		
		$sql = "select {$fields} from {$this->tabName}{$where}{$order}{$limit}";		//定义sql语句
		
		//echo $sql."<br>";
		return $this->query($sql);
	}
	
	/**
	  * 根据主键 查询一条记录
	  * @param mixed $pkValue 主键的值
	*/
	public function find($pkValue) {
		$fields = "*";
		if (!empty($this->fields)) {
			$fields = $this->fields;
			$this->fields = null;
		}
	
		$sql = "select {$fields} from {$this->tabName} where {$this->pk}='{$pkValue}'";	//定义sql
		$data = $this->query($sql);
		if (empty($data)) {
			return false;
		}
		return $data[0];
	}
	
	
	/**
	  * 删除一条记录
	  * @param $pkValue  主键的值
	*/
	public function delete($pkValue) {
		$sql = "delete from {$this->tabName} where {$this->pk}='{$pkValue}'";	//定义sql
		return $this->execute($sql);
	}
	
	/**
	  * 向数据表中 添加一条数据
	  * @param array $data  默认值 post 
	*/
	public function add($data = array()){
		if (empty($data)) {
			$data = $_POST;
		}
		$params = array();		//存放 买足条件的字段名
		$values = array();			//用于存放 满足条件的 值
		foreach ($data as $key => $val) {
			if (in_array($key, $this->fieldList)){
				$params[] = $key;
				$values[] = $val;
			}
		}
		
		//定义sql语句
		$sql = "insert into {$this->tabName} (`".implode("`,`", $params)."`) values('".implode("','", $values)."')";
		
		return $this->execute($sql);
	}
	
	/**
	  * 执行修改的方法
	  * @param array  $data  默认从post中取
	  * @return   影响行数
	*/
	public function save($data = array()){
		if (empty($data)) {
			$data = $_POST;
		}
		$values = array();
		foreach ($data as $key => $val) {
			if (in_array($key, $this->fieldList) && $key != $this->pk) {
				$values[] = "{$key}='{$val}'";
			}
		}

		//定义sql
		$sql = "update {$this->tabName} set ".implode(',', $values)." where {$this->pk}={$data[$this->pk]}";
		return $this->execute($sql);
	}
	
	
	/**
	  * 发送sql到mysql服务器 返回结果  只接收查询的sql
	  * @param string $sql  sql语句
	  * @param array
	*/
	public function query($sql) {
		$result = mysqli_query($this->link, $sql);		//发送sql语句
		$data = array();
		while ($rows = mysqli_fetch_assoc($result)) {
			$data[] = $rows;
		}
		return $data;
	}
	
	/**
	  * 处理sql语句 返回结果 处理 增删改操作 
	  * @param string  $sql
	  * @return 自增，返回自增id， 不是自增或者删除修改，返回影响行数
	*/
	public function execute($sql){
		mysqli_query($this->link, $sql);		//执行sql语句
		$id = mysqli_insert_id($this->link);
		if ($id > 0) {
			return $id;
		}
		return mysqli_affected_rows($this->link);
		
	}
	
	/**
	  * 获取要查询的字段
	  * @param string $fields  
	  * @return object $this
	*/
	public function field($fields) {
		$this->fields = $fields;
		return $this;
	}
	
	/**
	  * 添加搜索条件
	  * @param string $where
	  * @return object $this
	*/
	public function where($where) {
		$this->where = $where;
		return $this;
	}
	
	/**
	  *添加 排序条件
	  * @param string $order
	  * @return $this
	*/
	public function order($order) {
		$this->order = $order;
		return $this;
	}
	
	/**
	  * 添加 分页条件
	  * @param int $limit1
	  * @param int $limit2
	  * @return $this;
	*/
	public function limit($limit1, $limit2 = 0){
		if ($limit2 === 0) {
			$this->limit = $limit1;
		} else {
			$this->limit = $limit1.",".$limit2;
		}
		return $this;
	}
	
	
	/**
	  * 查询总记录条数
	  * @return int 总记录条数
	*/
	public function count(){
		$where = "";
		if (!empty($this->where)) {
			$where = " where ".$this->where;
			$this->where = null;
		}
		$sql = "select count(*) total from {$this->tabName}{$where}";
		$data = $this->query($sql);
		return $data[0]['total'];
		
	}
	
	/**
	  * 自动获取id的方法
	*/
	private function getField(){
		$sql = "desc {$this->tabName}";	//定义sql
		$data = $this->query($sql);
		$fieldList = array();
		//处理数据
		foreach ($data as $val) {
			if ($val['Key'] == 'PRI') {
				$this->pk = $val['Field'];
			}
			$fieldList[] = $val['Field'];
		}
		$this->fieldList = $fieldList;
	}
}